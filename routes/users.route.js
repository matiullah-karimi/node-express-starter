const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../middleware/validators/user.validator');

/* GET users listing. */
router.post('/', userValidator, userController.create);

module.exports = router;
