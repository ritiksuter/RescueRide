import { findByEmail, createUser, findById } from "../repositories/auth.repository.js";
import { hashUserPassword, isPasswordValid } from "./password.service.js";
import { generateTokens } from "./token.service.js";
import { publishUserCreated } from "../events/publisher.js";

export const registerUser = async ({ name, email, password, phone, role }) => {
  const existing = await findByEmail(email);
  if (existing) {
    const error = new Error("Email already in use");
    error.status = 400;
    throw error;
  }

  const passwordHash = await hashUserPassword(password);

  const user = await createUser({
    name,
    email,
    phone,
    passwordHash,
    role: role || "user",
  });

  // Publish event for other services (user-service, notification-service, etc.)
  await publishUserCreated({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  });

  const tokens = await generateTokens(user);

  return { user, ...tokens };
};

export const loginUser = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const valid = await isPasswordValid(password, user.passwordHash);
  if (!valid) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("Account is inactive");
    error.status = 403;
    throw error;
  }

  const tokens = await generateTokens(user);

  return { user, ...tokens };
};

export const getProfile = async (userId) => {
  const user = await findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
};
