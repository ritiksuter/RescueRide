import httpClient from "./httpClient";

export const getUserProfileApi = () => httpClient.get("/users/me");

export const updateUserProfileApi = (payload) =>
  httpClient.put("/users/me", payload);

export const getUserVehiclesApi = () =>
  httpClient.get("/users/vehicles");

export const addVehicleApi = (payload) =>
  httpClient.post("/users/vehicles", payload);
