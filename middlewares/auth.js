// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const IncorrectLogin = require('../errors/IncorrectLogin');

const authorize = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (error) {
    next(new IncorrectLogin());
  }
  req.user = payload;
  next();
};

module.exports = {
  authorize,
};
