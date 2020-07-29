'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransactionSchema = new Schema({
  debit: {
    type: Number
  },
  credit: {
    type: Number
  },
  description: {
    type: String
  },
  runningbalance: {
    type: Number
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);