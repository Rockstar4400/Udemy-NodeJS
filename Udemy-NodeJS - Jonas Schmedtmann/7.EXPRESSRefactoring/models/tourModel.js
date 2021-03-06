
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less 40 chars'],
      minlength: [10, 'A tour name must have more 10 chars'],
      //validate: [validator.isAlpha, 'Must be a string']
    },
    slug: String,
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
      required:  [true, 'A tour must have difficulty'],
      enum: {
        values: ['easy','medium','difficult'],
        message: 'Difficulty no handled'  
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1,'Rating must be above 1.0'],
      max: [1,'Rating must be below 5.0']
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
      type: Number,
      validate: {
        validator: function(val){
          return val < this.price;
        },
        message: 'Price ({VALUE}) discount must be lower that price'
      }
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
    startDates: [Date],
    secretTour:{
      type: Boolean,
      defult: false
    }
  },{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
  });

  // Virtual
  tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
  })

  // Middleware
  tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true });
    next();
  })

  tourSchema.pre('/^find/', function(next){
    this.find( { secretTour: { $ne: true } } );
    this.start = Date.now();
    next();
  })

  // Aggregations
  tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({ $match: { secretTour: { $ne: true }} });
    next();
  })
  
  const Tour = mongoose.model('Tour', tourSchema);
  
module.exports = Tour;