const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(getAllReviews)
  .post(authController.restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .delete(authController.restrictTo('user', 'admin'), deleteReview)
  .patch(authController.restrictTo('user', 'admin'), updateReview)
  .get(getReview);
module.exports = router;
