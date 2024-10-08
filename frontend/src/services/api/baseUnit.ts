import axios from "axios";

const baseUrl = "http://localhost:8000";
export const wsBaseUrl = "ws://localhost:8000";
const apiVersion = "/api/v1";

export const instance = axios.create({
  baseURL: `${baseUrl}${apiVersion}`,
});

export const config = (token: string) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
};

export const configForm = (token: string) => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  };
};

export const unAuthConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

//model
const modelUrl = "http://localhost:8001";

export const modelInstance = axios.create({
  baseURL: `${modelUrl}`,
});
