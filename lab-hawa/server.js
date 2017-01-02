'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('bankAccount:server');

const alertRouter = require('./routes/alert-route.js');
const bankAccountRouter = require('./routes/bankAccount-route.js');
const errorMiddleware = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bankAccount';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(alertRouter);
app.use(bankAccountRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
