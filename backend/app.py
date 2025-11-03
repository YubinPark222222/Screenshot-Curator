# app.py — FastAPI 백엔드 진입점

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ocr import extract_text
from classify import infer_intent_category
import shutil
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    # Save uploaded file
    file_id = str(uuid.uuid4()) + ".png"
    file_path = os.path.join(UPLOAD_DIR, file_id)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 1: OCR
    ocr_text = extract_text(file_path)

    # Step 2: Intent + Category 추론
    category, tags, intent = infer_intent_category(ocr_text, file_path)

    return {
        "filename": file.filename,
        "ocr_text": ocr_text,
        "intent": intent,
        "category": category,
        "tags": tags
    }
