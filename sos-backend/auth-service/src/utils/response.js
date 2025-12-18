export const success = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const failure = (
  res,
  message = "Something went wrong",
  statusCode = 400,
  errors = []
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
