/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashed) => {
      User.create({ ...req.body, password: hashed })
        .then((user) => res.status(201).send(user))
        .catch((error) => {
          if (error.message.includes('validation failed')) {
            res.status(400).send({
              message: 'Переданы некорректные данные при создании пользователя.',
            });
          } else {
            res.status(500).send({
              message: `${error.message}`,
            });
          }
        });
    })
    .catch();
};

const getUser = (req, res) => {
  console.log("123");
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      if (error.message.includes('validation failed')) {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

const getUserByID = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('User not found'))
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: `Некорректный id: ${req.params.id}`,
        });
      } else if (error.message === 'User not found') {
        res.status(404).send({
          message: `Пользователь по указанному id: ${req.params.id} не найден.`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

const updateUserinfo = (req, res) => {
  const { name, about } = req.body;
  const info = { name, about };
  User.findByIdAndUpdate(req.user._id, info, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ user }))
    .catch((error) => {
      if (error.message.includes('Validation failed')) {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      } else if (error.message === 'Not found') {
        res.status(404).send({
          message: `Пользователь по указанному id: ${req.user._id} не найден.`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const newAvatar = { avatar };
  User.findByIdAndUpdate(req.user._id, newAvatar, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ user }))
    .catch((error) => {
      if (error.message.includes('validation failed')) {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      } if (error.message === 'Not found') {
        res.status(404).send({
          message: `Пользователь по указанному id: ${req.user._id} не найден.`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

module.exports = {
  getUser, createUser, getUserByID, updateUserinfo, updateUserAvatar,
};
