# Description: main entry point for Scholarly-ai API server
# Author: Chandra Lindy

# standard library imports
from dotenv import load_dotenv
import os
import json
import requests

# third party imports
from fastapi import (
    FastAPI, Depends, HTTPException,
    Security, WebSocket, WebSocketDisconnect,
    Response, UploadFile)
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt

# local imports
from chat import chat
from file_operations.file_handler import (
    save_upload_file, get_file_path,
    get_user_directory
)

load_dotenv()

aws_access_key = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_session_token = os.environ.get("AWS_SESSION_TOKEN")
use_nginx_cors = bool(int(os.environ.get("USE_NGINX_CORS")))
secure_flag = bool(int(os.environ.get("SECURE_FLAG")))
jwt_algorithm = os.environ.get("JWT_ALGORITHM")
jwt_audience = os.environ.get("JWT_AUDIENCE")
jwt_issuer = os.environ.get("JWT_ISSUER")
cognito_jwk_url = os.environ.get("COGNITO_JWK_URL")
openai_key = os.environ.get("OPENAI_KEY")

app = FastAPI()

# CORS settings
if not use_nginx_cors:
    origins = [
        os.environ.get("FRONTEND_URL"),
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

security = HTTPBearer()

# get jwks from cognito
jwks_cache = None
def fetch_jwks() -> list:
    global jwks_cache
    if jwks_cache is None:
        url = cognito_jwk_url
        response = requests.get(url)
        jwks_cache = response.json()["keys"]
    return jwks_cache

def get_current_user(authorization: HTTPAuthorizationCredentials = Security(security)):
    token = authorization.credentials

    jwks = fetch_jwks()
    header = jwt.get_unverified_header(token)
    rsa_key = {}

    for key in jwks:
        if key["kid"] == header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "alg": key["alg"],
                "n": key["n"],
                "e": key["e"],
            }

    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=[jwt_algorithm],
            audience=jwt_audience,
            issuer=jwt_issuer,
        )
        user = payload.get("sub")
        if user is None:
            raise HTTPException(status_code=403, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid Token")

@app.post("/upload")
async def upload_file(file: UploadFile, user: str = Depends(get_current_user)):
    file_location = get_file_path(file.filename, user)
    save_upload_file(file, file_location)
    return {"info": f"file `{file.filename}` uploaded successfully"}

@app.get("/books")
async def list_books(user: str = Depends(get_current_user)):
    user_directory = get_user_directory(user)
    files = None
    try:
        files = os.listdir(user_directory)
    except Exception as e:
        # raise HTTPException(status_code=500, detail=str(e))
        pass
    if files:
        books = [{"id": i, "type": "book", "title": file, "file": ""} for i, file in enumerate(files)]
    else:
        books = []
    return JSONResponse(content=books)

@app.get("/book/{title}")
async def get_book(title: str, user: str = Depends(get_current_user)):
    user_directory = get_user_directory(user)
    file_location = user_directory / title
    print('file_location: ', file_location)
    try:
        with open(file_location, "rb") as f:
            file = f.read()
    except Exception as e:
        print('error: ', e)
        raise HTTPException(status_code=500, detail=str(e))
    response = Response(content=file)
    response.headers["Content-Type"] = "application/pdf"
    # return JSONResponse(content=file)
    return response

@app.websocket("/ws/{user_name}")
async def websocket_endpoint(socket: WebSocket, user_name: str):
    print('user_name: ', user_name)
    await socket.accept()

    try:
        while True:
            data = await socket.receive_text()

            messages = [(message["source"], message["text"]) for message in json.loads(data)]

            ai_message = chat(messages, openai_key)

            reply = {
                "source": "ai",
                "text": ai_message
            }


            print(f"Received message: {messages}")
            await socket.send_text(json.dumps(reply))
    except WebSocketDisconnect:
        print("websocket disconnected")
