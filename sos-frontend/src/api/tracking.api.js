import httpClient from "./httpClient";

export const getTrackingInfoApi = (sosId) =>
  httpClient.get(`/tracking/${sosId}`);
