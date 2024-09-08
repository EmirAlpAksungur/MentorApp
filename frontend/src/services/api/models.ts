import { modelInstance, unAuthConfig } from "./baseUnit";

const faceDetection = (body: { image_base64: string }) => {
  return modelInstance.post("/face_detection/", body, unAuthConfig);
};

const faceDetectionYOLO = (body: { image_base64: string }) => {
  return modelInstance.post("/face_detection_yolo/", body, unAuthConfig);
};

const ModelService = {
  faceDetection,
  faceDetectionYOLO,
};

export default ModelService;
