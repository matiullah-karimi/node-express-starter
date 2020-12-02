const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).send({'status': 'fail', 'message': 'Access denied. No token provided'});
  }

  try {
    const decoded = jwt.verify(token, 'secret key goes here');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
}