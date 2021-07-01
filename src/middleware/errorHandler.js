const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // log to console for dev
  // console.log(err.stack.red);
  // console.log(err.name);
  // console.log('Error from handler ===>', err);

  // mongoose bad object id
  if (err.name === 'CastError') {
    const errValue =
      !!err.value && typeof err.value === 'string'
        ? ` with id of ${err.value}`
        : '';
    const message = `Resource not found${errValue}`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
