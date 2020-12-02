const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../middleware/validators/user.validator');

/* GET users listing. */
router.route('/')
    .post(userValidator, userController.create)
    .get(userController.list);

router.route('/:id')
    .put(userValidator, userController.update)
    .get(userController.show)
    .delete(userController.delete);

module.exports = router;
