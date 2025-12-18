import httpClient from "./httpClient";

export const createSosApi = (payload) =>
  httpClient.post("/sos", payload);

export const getMySosListApi = () =>
  httpClient.get("/sos/my");

export const getSosByIdApi = (sosId) =>
  httpClient.get(`/sos/${sosId}`);

export const cancelSosApi = (sosId) =>
  httpClient.patch(`/sos/${sosId}/cancel`);
