import axios from "axios";
import { config } from "../config/env.js";
import { assignMechanicToSos, findById } from "../repositories/sos.repository.js";
import { publishMechanicAssigned, publishSosStatusUpdated } from "../events/publisher.js";
import { SOS_STATUS } from "../../shared/constants/status.js";

export const autoAssignMechanic = async (sosId) => {
  const sos = await findById(sosId);
  if (!sos) {
    const error = new Error("SOS request not found");
    error.status = 404;
    throw error;
  }

  if (sos.mechanicAuthId) {
    const error = new Error("Mechanic already assigned");
    error.status = 400;
    throw error;
  }

  // Call mechanic-service for nearby mechanics
  const { lat, lng } = sos.userLocation;

  const response = await axios.get(
    `${config.MECHANIC_SERVICE_URL}/mechanic/nearby`,
    {
      params: { lat, lng, radiusKm: 15 },
      // In a real world scenario, also add internal auth headers if needed
    }
  );

  const mechanics = response.data?.data || [];

  if (!mechanics.length) {
    const error = new Error("No nearby mechanics available");
    error.status = 404;
    throw error;
  }

  // Pick closest mechanic (already sorted in mechanic-service) -> first one
  const best = mechanics[0];

  const updated = await assignMechanicToSos(sosId, best.mechanicAuthUserId, {
    distanceKm: best.distanceKm,
    estimatedArrivalMinutes: Math.round(best.distanceKm * 2.5), // simple heuristic
  });

  await publishMechanicAssigned({
    sosId: updated._id.toString(),
    userAuthId: updated.userAuthId,
    mechanicId: updated.mechanicAuthId,
    userLocation: updated.userLocation,
    distanceKm: updated.assignment?.distanceKm,
  });

  await publishSosStatusUpdated({
    sosId: updated._id.toString(),
    status: updated.status,
  });

  return updated;
};

export const assignMechanicManually = async (sosId, mechanicAuthId) => {
  const updated = await assignMechanicToSos(sosId, mechanicAuthId, {});

  await publishMechanicAssigned({
    sosId: updated._id.toString(),
    userAuthId: updated.userAuthId,
    mechanicId: updated.mechanicAuthId,
    userLocation: updated.userLocation,
  });

  await publishSosStatusUpdated({
    sosId: updated._id.toString(),
    status: updated.status,
  });

  return updated;
};
