const express = require('express');
const router = express.Router();
const userRouter = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter);

module.exports = router;
