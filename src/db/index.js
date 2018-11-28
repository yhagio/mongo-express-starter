const mongoose = require('mongoose');

const config = require('../config');

mongoose.Promise = global.Promise;

const connect = () =>
  mongoose.connect(
    config.mongoURL,
    { useNewUrlParser: true, useCreateIndex: true }
  );

module.exports = connect;
