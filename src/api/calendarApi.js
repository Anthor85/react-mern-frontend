import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL || "http://localhost:4000/api",
});

// Add a request interceptor to include the API key in headers
calendarApi.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      "x-token": localStorage.getItem("token"),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default calendarApi;
