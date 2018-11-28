const express = require('express');
const userController = require('./controller');

const { protect } = require('../../modules/auth');

const router = express.Router();

router.param('id', userController.getOneByParam);

router
  .route('/')
  .get(userController.getAll)
  .post(userController.createOne);

router
  .route('/:id')
  .get(userController.getOne)
  .put(protect, userController.updateOne)
  .delete(protect, userController.deleteOne);

module.exports = router;
