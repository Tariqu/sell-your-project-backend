const {
  login,
  signUp,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = require('express').Router();

router.route('/login').post(login);
router.route('/signup').post(signUp);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

module.exports = router;
