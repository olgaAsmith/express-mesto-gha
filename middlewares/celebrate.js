// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const link = /^https?:\/\/?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+(#)?$/;
const id = /^[0-9a-fA-F]{24}$/;

const userInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(link),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const userID = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(id).required(),
  }),
});

const cardInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(link).required(),
  }),
});

const cardID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(id).required(),
  }),
});

module.exports = {
  userInfo, userID, cardInfo, cardID,
};
