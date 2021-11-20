const passport = require('passport');

module.exports = function authenticateJwt(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
      if (err) return next(err);

      if (!user) return res.status(401).send({'status': 'fail', 'message': 'Access denied'});


      req.user = user;
      next();
    })(req, res, next);
  }