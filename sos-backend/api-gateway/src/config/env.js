import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8000,

  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  MECHANIC_SERVICE_URL: process.env.MECHANIC_SERVICE_URL,
  SOS_SERVICE_URL: process.env.SOS_SERVICE_URL,
  TRACKING_SERVICE_URL: process.env.TRACKING_SERVICE_URL,
  ADMIN_SERVICE_URL: process.env.ADMIN_SERVICE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
};
