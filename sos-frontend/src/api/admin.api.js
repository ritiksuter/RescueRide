import httpClient from "./httpClient";

export const getAdminStatsApi = () =>
  httpClient.get("/admin/stats");

export const getAllUsersApi = (params) =>
  httpClient.get("/admin/users", { params });

export const getAllMechanicsApi = (params) =>
  httpClient.get("/admin/mechanics", { params });

export const updateUserStatusApi = (id, payload) =>
  httpClient.patch(`/admin/users/${id}`, payload);

export const updateMechanicStatusAdminApi = (id, payload) =>
  httpClient.patch(`/admin/mechanics/${id}`, payload);

export const getAdminSosApi = (params) =>
  httpClient.get("/admin/sos", { params });

export const getAdminLogsApi = () =>
  httpClient.get("/admin/logs");
