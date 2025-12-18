import httpClient from "./httpClient";
import { storage, TOKEN_KEYS } from "../utils/storage";

export const loginApi = async (payload) => {
  const res = await httpClient.post("/auth/login", payload);
  const d = res.data?.data;
  if (d?.accessToken) {
    storage.set(TOKEN_KEYS.ACCESS, d.accessToken);
    storage.set(TOKEN_KEYS.REFRESH, d.refreshToken);
  }
  return res;
};

export const registerApi = (payload) =>
  httpClient.post("/auth/register", payload);

export const meAuthApi = () => httpClient.get("/auth/me");

export const logoutApi = () => {
  storage.remove(TOKEN_KEYS.ACCESS);
  storage.remove(TOKEN_KEYS.REFRESH);
};
