'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  info: {
    Name: String,
    Hours: String,
  },
  coords: [Number, Number],
  inventory: [{
    name: String,
    quantity: Number,
    unit: String,
  }]
});

module.exports = mongoose.model('Seller', sellerSchema);
