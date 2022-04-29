import axios from "axios";

export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "PRODUCTION_URL"
        : "LOCAL_SERVER_URL";
    
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
