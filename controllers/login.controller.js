const passport = require('passport');

module.exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(500);
      return res.send({'status': 'err', 'message': err.message});
    }

    if (!user) {
      res.status(400);
      return res.send({'status': 'fail', 'message': info.message}); 
    }

    req.logIn(user, function(err) {
      if (err) {
        res.status(500);
        return res.send({'status': 'err', 'message': err.message});
      }
      const token = user.generateAuthToken();
      return res.send({'status': 'ok', 'token': token});
    });
  })(req, res, next);
};
