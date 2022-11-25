const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  return crypto.createHash('sha256').update(resetToken).digest('hex');
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1. get the token from headers
  let idToken;
  if (
    // eslint-disable-next-line operator-linebreak
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line prefer-destructuring
    idToken = req.headers.authorization.split(' ')[1];
    if (!idToken) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  }

  // 2. token verification
  const token = jwt.verify(idToken, process.env.JWT_SECRET);
  // 3. get user info from own database and add to req object
  const freshUser = await User.findByPk(token.id, {
    attributes: { exclude: ['password'] },
  });
  if (!freshUser) {
    return next(new AppError('User no longer exists.', 401));
  }
  req.user = freshUser;
  return next();
});

exports.restrictTo = (...userType) => {
  // userType ['0', '1', '2'] // 0. for admin 1. for admin, 2. wellness coach, 3. researcher
  const checkPermissionMiddleware = (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    return next();
  };
  return checkPermissionMiddleware;
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email and password', 401));
  }
  const token = signToken({
    id: user.id,
    email: user.email,
    userType: user.userType,
  });
  return res.status(200).json({
    status: 'success',
    token,
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  const body = req.body;
  if (!['1', '2'].includes(body.userType)) {
    return next(new AppError('Invalid userType! can only be 1 or 2', 400));
  }
  const newUser = await User.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
    profilePic: body.profilePic,
    address: body.address,
  });

  const token = signToken({
    id: newUser.id,
    email: newUser.email,
    userType: newUser.userType,
  });
  return res.status(201).json({
    status: 'success',
    token,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on email
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There is no user with this email', 404));
  }
  // 2. Generate the random token
  const resetToken = generatePasswordResetToken();

  // 3. Send it to user's email
});

exports.resetPassword = catchAsync(async (req, res, next) => {});
