const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword').patch(authController.resetPassword);
router
  .route('/updateMyPassword')
  .patch(authController.protect, authController.updatePassword);
router
  .route('/updateMe')
  .patch(authController.protect, userController.updateMe);
router.route('/').get(userController.getAllUsers);
router
  .route('/deleteMe')
  .delete(authController.protect, userController.deleteMe);
// .post(userController.createUser);
// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
