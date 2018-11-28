const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const { User } = require('../resources/user/model');
const config = require('../../config');

const { jwtSecret, jwtExpireIn } = config;

const checkToken = expressJwt({ secret: jwtSecret });

/**
 * Sign the JWT token
 * @param {*} id
 */
const signToken = id => jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpireIn });

/**
 * Sign JWT token and send it the client
 * @param {*} req
 * @param {*} res
 * @param {*} _
 */
const signin = (req, res) => {
  const token = signToken(req.user.id);
  res.json({ token });
};

/**
 * Decode JWT token and check the token if valid
 */
const decodeToken = () => (req, res, next) => {
  if (
    req.query &&
    Object.prototype.hasOwnProperty.call(req.query, 'access_token')
  ) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }

  return checkToken(req, res, next);
};

/**
 * Get user given user id and set request user object
 */
const getFreshUser = () => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Verify user with username and password
 */
const verifyUser = () => async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ error: 'You need both username and password.' });
    return;
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res
        .status(401)
        .send({ error: `No user found with username: ${username}.` });
    } else if (!user.authenticate(password)) {
      res.status(401).send({ error: 'Username and password must be correct.' });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const protect = [decodeToken(), getFreshUser()];

module.exports = {
  signToken,
  protect,
  verifyUser,
  signin,
  decodeToken,
  getFreshUser
};
