import httpProxy from "http-proxy";
import { config } from "../config/env.js";

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  proxyTimeout: 30000,
  timeout: 30000,
});

proxy.on(
  "error",
  (error, req, res) => {
    console.error(
      "Proxy Error:",
      error.message
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message:
          "Internal Proxy Error",
      });
    }
  }
);

/**
 * Forward request to target service
 */
export const forwardToService =
  (service) => {
    return (req, res) => {
      if (!service) {
        return res.status(500).json({
          success: false,
          message:
            "Service target is not configured",
        });
      }

      proxy.web(
        req,
        res,
        {
          target: service,
        },
        (error) => {
          console.error(
            "Service Proxy Failure:",
            error?.message
          );

          if (!res.headersSent) {
            return res.status(500).json({
              success: false,
              message:
                "Failed to connect to service",
            });
          }
        }
      );
    };
  };

/**
 * Registered Internal Services
 */
export const services = {
  auth:
    config.AUTH_SERVICE_URL,

  user:
    config.USER_SERVICE_URL,

  mechanic:
    config.MECHANIC_SERVICE_URL,

  sos:
    config.SOS_SERVICE_URL,

  tracking:
    config.TRACKING_SERVICE_URL,

  admin:
    config.ADMIN_SERVICE_URL,

  notification:
    config.NOTIFICATION_SERVICE_URL,

  aiChat:
    config.AI_CHAT_SERVICE_URL,

  pdfIngestion:
    config.PDF_INGESTION_SERVICE_URL,
};