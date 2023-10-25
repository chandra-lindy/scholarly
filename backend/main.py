from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

aws_access_key = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_session_token = os.environ.get("AWS_SESSION_TOKEN")

app = FastAPI()

origins = [
  "https://scholarly-ai.com",
  os.environ.get("FRONTEND_URL"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_middleware(request, call_next):
    response = await call_next(request)
    print(response.headers)
    return response

@app.get("/")
async def root():
    return {"message": "World! Ready or not ... Here I come!!"}

@app.get("/login")
async def login():
    return {"message": "Login"}
