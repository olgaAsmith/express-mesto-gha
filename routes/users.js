const router = require('express').Router();
const {
  createUser, getUser, getUserByID, updateUserinfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.patch('/me', updateUserinfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
