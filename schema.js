
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema

var carSchema = new Schema({

  make: String,
  model: String,
  year: Number,
  VIN: String,
  MSRP: String,
  photo: String,
  color: String,
  purchase_date: String,
  purchaser_name: String,
  purchaser_email: String,
  purchaser_address: String,
  price_paid: String,
},{
    versionKey: false // remove __v property added by mongoose
});

// Make schema available to the application
module.exports = carSchema;
