const express = require('express');
const router = express.Router();
const userRouter = require('./users.route');
const passport = require('passport');
const loginController = require('../controllers/login.controller');
const loginValidator = require('../middleware/validators/login.validator');
const { roles } = require('../config/constants');
const { permit } = require('../middleware/role.middleware');
const roleController = require('../controllers/role.controller');
const fileUploadRouter = require('./file-upload.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', loginValidator, loginController.login);

const authMiddleware = [ passport.authenticate('jwt', { session: false }), permit([roles.ADMIN]) ];

router.use('/users', authMiddleware, userRouter);
router.use('/roles', authMiddleware, roleController.list)
router.use('/file-upload', fileUploadRouter);

module.exports = router;
