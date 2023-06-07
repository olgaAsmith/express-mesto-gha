const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '647dfc9d4abfbf8c3b3eb4b5',
  };
  res.status(404).send({
    message: 'Такой страницы не существует',
  });
  next();
});

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Start...');
});
