'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('bankAccount:alert');
const Schema = mongoose.Schema;

const BankAccount = require('./bankAccount.js');

const alertSchema = Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  bankAccounts: [{ type: Schema.Types.ObjectId, ref: 'bankAccount' }]
});

const Alert = module.exports = mongoose.model('alert', alertSchema);

Alert.findByIdAndAddBankAccount = function(id, bankAccount) {
  debug('findByIdAndAddBankAccount');

  return Alert.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( alert => {
    bankAccount.alertID = alert._id;
    this.tempAlert = alert;
    return new BankAccount(bankAccount).save();
  })
  .then( bankAccount => {
    this.tempAlert.bankAccounts.push(bankAccount._id);
    this.tempbankAccount = bankAccount;
    return this.tempAlert.save();
  })
  .then( () => {
    return this.tempbankAccount;
  });
};
