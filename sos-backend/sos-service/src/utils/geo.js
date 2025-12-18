import { geoDistance } from "../../shared/utils/geoDistance.js"; // adjust path if needed

export const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
  return geoDistance(lat1, lng1, lat2, lng2);
};
