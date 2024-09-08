from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
from PIL import Image
import pickle
import numpy as np
import io
import cv2
import torch
import matplotlib.pyplot as plt

# with open('./models/faceDetection/model.pkl', 'rb') as f:
#     faceDetectionModel = pickle.load(f)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    image_base64: str 


# @app.post("/face_detection/")
# async def predict(request: PredictRequest):
#     try:
#         image_data = base64.b64decode(request.image_base64)
#         image = Image.open(io.BytesIO(image_data))
        
#         image = np.array(image)

#         image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#         image = cv2.resize(image, (224, 224))

#         image = np.expand_dims(image, axis=0)
#         prediction = faceDetectionModel.predict(image)
#         return {"prediction": prediction.tolist()}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))


model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

@app.post("/face_detection_yolo/")
async def predictYOLO(request: PredictRequest):
    try:
        print("predict yolo")
        image_data = base64.b64decode(request.image_base64)
        image = Image.open(io.BytesIO(image_data))

        # Convert the image to a numpy array
        image_np = np.array(image)

        # Run the model on the image
        results = model(image_np)

        # Convert the results to a Pandas DataFrame, then to a dictionary
        detections = results.pandas().xyxy[0].to_dict(orient="records")

        return {"prediction": detections}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

