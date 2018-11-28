const express = require('express');
const authRouter = require('./resources/auth/router');
const userRouter = require('./resources/user/router');
const apiErrorHandler = require('./modules/errorHandler');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use(apiErrorHandler);

module.exports = router;
