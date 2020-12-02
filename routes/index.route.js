const express = require('express');
const router = express.Router();
const userRouter = require('./users.route');
const passport = require('passport');
const loginController = require('../controllers/login.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', loginController.login)
router.use('/users', passport.authenticate('jwt'), userRouter);

module.exports = router;
