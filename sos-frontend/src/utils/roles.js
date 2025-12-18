export const ROLES = {
  USER: "user",
  MECHANIC: "mechanic",
  ADMIN: "admin",
};

export const isUser = (role) => role === ROLES.USER;
export const isMechanic = (role) => role === ROLES.MECHANIC;
export const isAdmin = (role) => role === ROLES.ADMIN;
