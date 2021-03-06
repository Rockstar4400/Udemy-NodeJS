
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    duration:{
      type: Number,
      required:  [true, 'A tour must have duration']
    },
    maxGroupSize:{
      type: Number,
      required:  [true, 'A tour must have group size']
    },
    difficulty:{
      type: String,
      required:  [true, 'A tour must have difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    raitingsQuantity:{
      type: Number,
      defaul: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price']
    },
    priceDiscount: {
      type: Number
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover:{
      type: String,
      required: [true, 'A tour must have image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date]
  });
  
  const Tour = mongoose.model('Tour', tourSchema);
  
module.exports = Tour;