const mongoose = require('mongoose');
require('../api/resources/user/model');

const config = require('./index');

mongoose.Promise = global.Promise;

const removeModel = modelName => {
  const model = mongoose.model(modelName);
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }
    return model.deleteMany(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const dropDb = () =>
  mongoose
    .connect(
      config.mongoURL,
      { useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));

module.exports = {
  removeModel,
  dropDb
};
