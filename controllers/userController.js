const sequelize = require('sequelize');
const User = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAndCountAll({
    where: {
      userType: {
        [sequelize.Op.ne]: '0',
      },
    },
    attributes: { exclude: ['password'] },
  });
  return res.status(200).json({
    status: 'success',
    data: users,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { firstName, lastName, profilePic, address } = req.body;
  user.firstName = firstName;
  user.lastName = lastName;
  user.profilePic = profilePic;
  user.address = address;
  await user.save();
  return res.json({
    status: 'success',
    data: user,
  });
});
