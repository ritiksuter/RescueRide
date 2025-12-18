import { updateSosStatusService } from "./sos.service.js";
import { SOS_STATUS } from "../../shared/constants/status.js";

export const startSosJob = async (sosId, actorRole) => {
  return updateSosStatusService(sosId, SOS_STATUS.IN_PROGRESS, actorRole);
};

export const completeSosJob = async (sosId, actorRole) => {
  return updateSosStatusService(sosId, SOS_STATUS.COMPLETED, actorRole);
};

export const cancelSosJob = async (sosId, actorRole) => {
  return updateSosStatusService(sosId, SOS_STATUS.CANCELLED, actorRole);
};
