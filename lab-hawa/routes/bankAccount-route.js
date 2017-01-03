'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('bankAccount:bankAccount-router.js');
const Alert = require('../model/alert.js');
const BankAccount = require('../model/bankAccount.js');
const bankAccountRouter = module.exports = new Router();

bankAccountRouter.post('/api/alert/:alertID/bankAccount', jsonParser, function(req, res, next) {
  debug('POST: /api/bankAccount');

  Alert.findByIdAndAddBankAccount(req.params.alertID, req.body)
  .then( bankAccount => res.json(bankAccount))
  .catch(next);
});

bankAccountRouter.get('/api/bankAccount/:id', function(req, res, next) {
  debug('GET: /api/bankAccount');

  BankAccount.findById(req.params.id)
  .then( bankAccount => {
    if(bankAccount === null) return Promise.reject(createError(404, 'can\'t be found'));
    res.json(bankAccount);
  })
  .catch(err => next(createError(404, err.message)));
});

bankAccountRouter.put('/api/bankAccount/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/bankAccount');

  BankAccount.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( bankAccount => res.json(bankAccount))
  .catch(next);
});

bankAccountRouter.delete('/api/bankAccount/:id', function(req, res, next) {
  debug('DELETE: /api/bankAccount');

  BankAccount.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
