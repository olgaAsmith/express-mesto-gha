// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (error) {
    res.status(401).send({ message: 'Доступно только для авторизованных пользователей' });
  }
  req.user = payload;
  next();
};

module.exports = {
  authorize,
};
