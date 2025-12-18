import axios from "axios";
import { API_BASE_URL } from "../config/env";
import { storage, TOKEN_KEYS } from "../utils/storage";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const token = storage.get(TOKEN_KEYS.ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      storage.remove(TOKEN_KEYS.ACCESS);
      storage.remove(TOKEN_KEYS.REFRESH);
      window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  }
);

export default httpClient;
