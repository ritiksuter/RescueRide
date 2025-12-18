import { createAdminAction, listAdminActions, getAdminActionsByTarget } from "../repositories/admin.repository.js";
import { publishAdminAction } from "../events/publisher.js";

export const recordAdminAction = async ({
  adminAuthId,
  actionType,
  targetType,
  targetId,
  reason,
  meta,
}) => {
  const action = await createAdminAction({
    adminAuthId,
    actionType,
    targetType,
    targetId,
    reason,
    meta,
  });

  await publishAdminAction({
    id: action._id.toString(),
    adminAuthId,
    actionType,
    targetType,
    targetId,
    reason,
    createdAt: action.createdAt,
  });

  return action;
};

export const getRecentAdminActions = async (params) => {
  return listAdminActions(params);
};

export const getActionsForTarget = async (targetType, targetId) => {
  return getAdminActionsByTarget(targetType, targetId);
};
