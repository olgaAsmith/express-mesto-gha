const router = require('express').Router();
const {
  getUser, getUserByID, updateUserinfo, updateUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:id', getUserByID);
router.patch('/me', updateUserinfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
