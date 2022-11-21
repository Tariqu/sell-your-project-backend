const { protect, restrictTo } = require('../controllers/authController');
const { getAllUser, updateUser } = require('../controllers/userController');

const router = require('express').Router();

router.route('/').get(protect, restrictTo('0'), getAllUser);
router
  .route('/me')
  .get(protect, (req, res, next) =>
    res.json({ status: 'sucess', data: req.user })
  )
  .patch(protect, updateUser);

module.exports = router;
