const router = require('express').Router();
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.get('/', getAllCards);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
