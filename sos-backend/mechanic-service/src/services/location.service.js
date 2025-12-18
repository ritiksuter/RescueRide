import { getAllAvailableStatuses } from "../repositories/status.repository.js";
import { getMechanicsByIds } from "../repositories/mechanic.repository.js";
import { calculateDistanceKm } from "../utils/geo.js";

export const findNearbyMechanics = async ({ lat, lng, radiusKm = 10 }) => {
  // 1. Get all available mechanics + their locations
  const availableStatuses = await getAllAvailableStatuses();

  if (!availableStatuses.length) return [];

  // 2. Filter by distance
  const withinRadius = availableStatuses
    .map((status) => {
      if (!status.location?.lat || !status.location?.lng) return null;
      const distanceKm = calculateDistanceKm(
        lat,
        lng,
        status.location.lat,
        status.location.lng
      );
      return {
        mechanicAuthUserId: status.mechanicAuthUserId,
        distanceKm,
        location: status.location,
        status: status.status,
      };
    })
    .filter(
      (m) => m && (m.distanceKm <= radiusKm || radiusKm === 0)
    );

  if (!withinRadius.length) return [];

  // 3. Load mechanic profile details
  const mechanicIds = withinRadius.map((m) => m.mechanicAuthUserId);
  const profiles = await getMechanicsByIds(mechanicIds);

  // 4. Join profile + status data
  const profileMap = new Map();
  profiles.forEach((p) => profileMap.set(p.authUserId, p));

  const result = withinRadius
    .map((m) => {
      const profile = profileMap.get(m.mechanicAuthUserId);
      if (!profile) return null;
      return {
        mechanicAuthUserId: m.mechanicAuthUserId,
        distanceKm: m.distanceKm,
        location: m.location,
        status: m.status,
        profile,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return result;
};
