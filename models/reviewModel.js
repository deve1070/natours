const mongoose = require('mongoose');
const { $where } = require('./userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      default: ' ',
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: [1, 'minimum rating must be above 1'],
      max: [5, 'maximum rating must be below 5'],
    },
    createdAt: {
      type: Date,
      defaulet: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    // These two properties help us to show properties which does not belong
    // in the schema but calulated virtually to be displayed in the output
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  }).populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

reviewSchema.statics.calcAverageRating = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
};
reviewSchema.pre('save', function (next) {
  this.constructor.calcAverageRating(this.tour);
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
