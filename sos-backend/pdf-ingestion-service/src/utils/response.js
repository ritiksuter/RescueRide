/**
 * Standard Success Response
 */
export const successResponse = (
  res,
  message,
  data = {},
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard Error Response
 */
export const errorResponse = (
  res,
  message,
  statusCode = 500,
  error = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};