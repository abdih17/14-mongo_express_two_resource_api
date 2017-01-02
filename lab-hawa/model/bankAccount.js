'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankAccountSchema = Schema({
  name: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  alertID: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('bankAccount', bankAccountSchema);
