const express = require('express');
const {
  getAllTours,
  creatTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('../controller/tourController');

const router = express.Router();
// router.param('id', checkID);
router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(creatTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
