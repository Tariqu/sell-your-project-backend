const express = require('express');

const gloabalErrorHandler = require('./controllers/errorController');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
// All routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());

// all route
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

app.all(
  '*',
  catchAsync(async (req, _res, _next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(gloabalErrorHandler);

module.exports = app;
