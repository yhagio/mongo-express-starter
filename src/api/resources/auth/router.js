const express = require('express');

const { verifyUser } = require('../../modules/auth');
const authController = require('./controller');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(verifyUser(), authController.login);

module.exports = router;
