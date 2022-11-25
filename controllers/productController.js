const sequelize = require('sequelize');
const Product = require('../db/models/project');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const body = req.body;
  const newProduct = await Product.create({
    title: body.title,
    thumbnail: body.thumbnail,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });
  return res.status(200).json({
    status: 'success',
    data: newProduct,
  });
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const result = await Product.findAll();
  res.status(200).json({
    status: 'success',
    data: result
  });
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { firstName, lastName, profilePic, address } = req.body;
  user.firstName = firstName;
  user.lastName = lastName;
  user.profilePic = profilePic;
  user.address = address;
  const result = await user.save();
  return res.json({
    status: 'success',
    data: result,
  });
});
