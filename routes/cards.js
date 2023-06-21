const router = require('express').Router();
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');
const celebrate = require('../middlewares/celebrate');

router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.get('/', getAllCards);
router.put('/:cardId/likes', celebrate.cardID, likeCard);
router.delete('/:cardId/likes', celebrate.cardID, dislikeCard);

module.exports = router;
