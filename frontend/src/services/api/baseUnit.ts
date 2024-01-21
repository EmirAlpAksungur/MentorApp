import axios from "axios";

const baseUrl = "http://localhost:8000";

const apiVersion = "/api/v1";

export const instance = axios.create({
  baseURL: `${baseUrl}${apiVersion}`,
});

export const config = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };
};

export const unAuthConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
