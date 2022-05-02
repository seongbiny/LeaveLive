import axios from "axios";

export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "PRODUCTION_URL"
    : "http://localhost:8080/api";

function apiInstance() {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
}

export { apiInstance };
