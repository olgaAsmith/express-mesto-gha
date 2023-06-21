/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const { authorize } = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');
const errorType = require('./middlewares/error');
const NotExist = require('./errors/NotExist');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(authorize);

app.use(router);

app.use('/*', (req, res, next) => {
  next(new NotExist());
});

app.use(errorType);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Start...is 0k');
});
