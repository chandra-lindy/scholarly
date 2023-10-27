# Description: main entry point for Scholarly-ai API server
# Author: Chandra Lindy

# standard library imports
from dotenv import load_dotenv
import os
import requests

# third party imports
from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt

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
        # debug code
        print('payload: ', payload)
        user = payload.get("sub")
        if user is None:
            raise HTTPException(status_code=403, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid Token")

@app.post("/chat")
async def chat_route(current_user: str = Depends(get_current_user)):
    return {"message": "Welcome to the chat!", "user": current_user}

@app.get("/")
async def root():
    return {"message": "World! Ready or not ... Here I come!!"}
