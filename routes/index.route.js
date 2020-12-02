const express = require('express');
const router = express.Router();
const userRouter = require('./users.route');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', passport.authenticate('jwt'), userRouter);

module.exports = router;
