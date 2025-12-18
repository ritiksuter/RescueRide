import httpClient from "./httpClient";

export const getMechanicProfileApi = () =>
  httpClient.get("/mechanics/me");

export const updateMechanicStatusApi = (payload) =>
  httpClient.patch("/mechanics/status", payload);

export const getMechanicJobsApi = () =>
  httpClient.get("/mechanics/jobs");

export const acceptJobApi = (sosId) =>
  httpClient.post(`/mechanics/jobs/${sosId}/accept`);
