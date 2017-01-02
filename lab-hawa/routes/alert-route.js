'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('bankAccount:alert-router.js');

const Alert = require('../model/alert.js');
const alertRouter = module.exports = new Router();

alertRouter.post('/api/alert', jsonParser, function(req, res, next) {
  debug('POST: api/alert');

  req.params.timestamp = new Date();
  new Alert(req.body).save()
  .then(alert => res.json(alert))
  .catch(next);
});

alertRouter.get('/api/alert/:id', function(req, res, next) {
  debug('GET: api/alert');

  Alert.findById(req.params.id)
  .populate('bankAccounts')
  .then(alert => res.json(alert))
  .catch(err => next(createError(404, err.message)));
});

alertRouter.put('/api/alert/:id', jsonParser, function(req, res, next) {
  debug('PUT: api/alert');

  Alert.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( alert => res.json(alert))
  .catch(next);
});

alertRouter.delete('/api/alert/:id', function(req, res, next) {
  debug('DELETE: api/alert');

  Alert.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
