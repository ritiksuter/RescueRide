import httpProxy from "http-proxy";
import { config } from "../config/env.js";

const proxy = httpProxy.createProxyServer();

export const forwardToService = (service) => {
  return (req, res) => {
    proxy.web(req, res, { target: service }, (err) => {
      console.error("Proxy error:", err);
      res.status(500).json({ message: "Internal Proxy Error" });
    });
  };
};

// Available service URLs
export const services = {
  auth: config.AUTH_SERVICE_URL,
  user: config.USER_SERVICE_URL,
  mechanic: config.MECHANIC_SERVICE_URL,
  sos: config.SOS_SERVICE_URL,
  tracking: config.TRACKING_SERVICE_URL,
  admin: config.ADMIN_SERVICE_URL,
};
