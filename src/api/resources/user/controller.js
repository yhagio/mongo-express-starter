const merge = require('lodash.merge');

const { User } = require('./model');
const { resUser } = require('./helper');

const getOneByParam = (req, res, next, id) =>
  User.findById(id)
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

const createOne = (req, res, next) => {
  const { body } = req;
  return User.create(body)
    .then(doc => res.status(201).json(resUser(doc)))
    .catch(err => next(err));
};

const updateOne = (req, res, next) => {
  const { docFromId, body } = req;

  merge(docFromId, body);

  return docFromId
    .save()
    .then(doc => res.status(201).json(resUser(doc)))
    .catch(err => next(err));
};

const deleteOne = (req, res, next) => {
  const { docFromId } = req;

  return docFromId
    .remove()
    .then(doc => res.status(201).json(resUser(doc)))
    .catch(err => next(err));
};

const getOne = (req, res) => res.status(201).json(resUser(req.docFromId));

const getAll = (req, res, next) => {
  const { skip, limit } = req.query;

  return User.find({})
    .skip(parseInt(skip, 10))
    .limit(parseInt(limit, 10))
    .select('username email')
    .exec()
    .then(docs => res.status(201).json(docs))
    .catch(err => next(err));
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
  getOneByParam
};
