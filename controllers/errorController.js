const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  res.status(statusCode).json({
    status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational, trusted error: send  message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknow error: don't want to leak error details
  } else {
    // 1) Log error: we can use loging machanise as well
    // eslint-disable-next-line no-console
    console.error('Error ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  let error = err;
  // eslint-disable-next-line no-console
  console.log(err, err.name, err.message);
  if (err.name === 'SequelizeValidationError') {
    error = new AppError(err.errors[0].message, 400);
  } else if (err.code === 'auth/argument-error') {
    error = new AppError('Please provide valid token', 401);
  } else if (err.code === 'auth/id-token-expired') {
    error = new AppError('Token already expired! Please login again', 401);
  } else if (err.code === 'auth/user-not-found') {
    error = new AppError('User not found', 404);
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    error = new AppError(err.errors[0].message, 400);
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    if (err.index === 'User_PrimaryWellnessCoachUserId_fkey') {
      error = new AppError('Invalid primary wellness coach Id', 400);
    }
    if (err.index === 'User_SecondaryWellnessCoachUserId_fkey') {
      error = new AppError('Invalid secondary wellness coach Id', 400);
    }
  } else if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token please provide a valid token', 401);
  }
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, res);
  }
};
