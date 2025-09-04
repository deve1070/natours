const express = require('express');
const {
  getAllTours,
  creatTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controller/tourController');

const router = express.Router();
// router.param('id', checkID);

router.route('/').get(getAllTours).post(creatTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
