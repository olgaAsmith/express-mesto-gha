// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const regLink = /^https?:\/\/?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+(#)?$/;
const regID = /^[0-9a-fA-F]{24}$/;

const userInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regLink),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const userID = celebrate({
  params: Joi.object().keys({
    id: Joi.string().regex(regID).required(),
  }),
});

const userUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regLink),
  }),
});

const cardInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(regLink).required(),
  }),
});

const cardID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(regID).required(),
  }),
});

module.exports = {
  userInfo, userID, userUpdate, cardInfo, cardID,
};
