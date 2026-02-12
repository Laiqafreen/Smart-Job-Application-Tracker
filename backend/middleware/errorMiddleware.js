// Centralized error handling middleware
// Ensures consistent error responses for all routes

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  // If response status code is not set, default to 500 (server error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

