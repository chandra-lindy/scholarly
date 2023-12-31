import shutil
from pathlib import Path
from fastapi import UploadFile

BASE_UPLOAD_DIRECTORY = Path("uploads")


def save_upload_file(upload_file: UploadFile, destination: Path):
  destination.parent.mkdir(parents=True, exist_ok=True)
  try:
    with destination.open("wb") as buffer:
      shutil.copyfileobj(upload_file.file, buffer)
  finally:
    upload_file.file.close()

def get_file_path(filename: str, user_name: str):
  print("get_file_path")
  user_upload_directory = BASE_UPLOAD_DIRECTORY / user_name
  print ('base upload directory: ', BASE_UPLOAD_DIRECTORY)
  print('username: ', user_name)
  print('returns: ', user_upload_directory / filename)
  return user_upload_directory / filename

def get_user_directory(user: str):
  return BASE_UPLOAD_DIRECTORY / user
