const express = require('express');
const cors = require('cors');

const gloabalErrorHandler = require('./controllers/errorController');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
// All routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

const app = express();

app.use(express.json());

app.use(cors());

// all route
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);

app.all(
  '*',
  catchAsync(async (req, _res, _next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(gloabalErrorHandler);

module.exports = app;
