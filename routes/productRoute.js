const { protect, restrictTo } = require('../controllers/authController');
const { createProduct, getProducts } = require('../controllers/productController');

const router = require('express').Router();

router.route('/').get(protect, getProducts).post(protect, restrictTo('0', '1'), createProduct);

module.exports = router;
