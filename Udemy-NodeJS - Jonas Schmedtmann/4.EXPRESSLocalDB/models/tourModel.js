
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price']
    }
  });
  
  const Tour = mongoose.model('Tour', tourSchema);
  
  const testTour = new Tour({
    name: 'The Forest Hicker 2',
    rating: 4.7,
    price: 497
  });
  
  testTour.save().then(doc => {
    console.log(doc);
  }).catch(err => {
    console.log('ERROR!', err);
  });
  