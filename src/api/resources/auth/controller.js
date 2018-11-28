const { User } = require('../user/model');
const { resUser } = require('../user/helper');
const { signToken } = require('../../modules/auth');

const signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    const token = signToken(doc._id);
    const docWithToken = { ...resUser(doc), ...{ token } };
    res.status(201).json(docWithToken);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const doc = await User.findOne(req.user._id);
    const token = signToken(req.user._id);
    const docWithToken = { ...resUser(doc), ...{ token } };
    res.status(201).json(docWithToken);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login
};
