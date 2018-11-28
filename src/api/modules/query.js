const merge = require('lodash.merge');

// Generic controller
const controllers = {
  createOne(model, body) {
    return model.create(body);
  },

  updateOne(docFromId, update) {
    merge(docFromId, update);
    return docFromId.save();
  },

  deleteOne(docFromId) {
    return docFromId.remove();
  },

  getOne(docFromId) {
    return Promise.resolve(docFromId);
  },

  getAll(model, skip, limit) {
    return model
      .find({})
      .skip(parseInt(skip, 10))
      .limit(parseInt(limit, 10))
      .exec();
  },

  getOneByParam(model, id) {
    return model.findById(id);
  }
};

const createOne = model => (req, res, next) => {
  const { body } = req;
  return controllers
    .createOne(model, body)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));
};

const updateOne = () => (req, res, next) => {
  const { docFromId, body } = req;

  return controllers
    .updateOne(docFromId, body)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));
};

const deleteOne = () => (req, res, next) => {
  const { docFromId } = req;

  return controllers
    .deleteOne(docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));
};

const getOne = () => (req, res, next) => {
  const { docFromId } = req;

  return controllers
    .getOne(docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));
};

const getAll = model => (req, res, next) => {
  const { skip, limit } = req.query;

  return controllers
    .getAll(model, skip, limit)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));
};

const getOneByParam = model => (req, res, next, id) =>
  controllers
    .getOneByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error('Not Found Error'));
      } else {
        req.docFromId = doc;
        next();
      }
    })
    .catch(error => {
      next(error);
    });

const genericControllers = (model, overrides = {}) => {
  const defaults = {
    getOneByParam: getOneByParam(model),
    getAll: getAll(model),
    getOne: getOne(),
    deleteOne: deleteOne(),
    updateOne: updateOne(),
    createOne: createOne(model)
  };
  return { ...defaults, ...overrides };
};

module.exports = {
  controllers,
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
  getOneByParam,
  genericControllers
};
