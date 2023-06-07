const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const newCard = { name, link };
  Card.create(newCard)
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.message === 'Bad Request') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.status(200).send({}))
    .catch(() => res.status(404).send({
      message: `Карточка с указанным ${req.params.cardId} не найдена.`,
    }));
};

const getAllCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((error) => {
      if (error.message === 'Bad Request') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => {
      res.status(200).send({});
    })
    .catch((error) => {
      if (error.message === 'Bad Request') {
        res.status(400).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      } if (error.message === 'Not found') {
        res.status(404).send({
          message: `Передан несуществующий ${req.params.cardId} карточки.`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => {
      res.status(200).send({});
    })
    .catch((error) => {
      if (error.message === 'Bad Request') {
        res.status(400).send({
          message: 'Переданы некорректные данные для снятия лайка.',
        });
      } if (error.message === 'Not found') {
        res.status(404).send({
          message: `Передан несуществующий ${req.params.cardId} карточки.`,
        });
      } else {
        res.status(500).send({
          message: 'Ошибка по умолчанию.',
        });
      }
    });
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
