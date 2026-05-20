const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errMessage = "Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => ({
      path: el.path,
      message: el.message,
    }));

    errMessage = errors;
    statusCode = 400;
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    errMessage = `Duplicate key error: ${field} must be unique.`;
    statusCode = 400;
  }

  // Development mode
  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      success: false,
      name: err.name,
      message: errMessage,
      stack: err.stack,
    });
  } else {
    // Production mode
    res.status(statusCode).json({
      success: false,
      error: errMessage,
    });
  }
};

module.exports = errorHandler;