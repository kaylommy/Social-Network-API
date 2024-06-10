const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');
  
  // /api/users (anything thats route includes all users)
  router.route('/').get(getUsers).post(createUser);

// /api/users/:userId (anything thats route uses userId)
  router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
  
  module.exports = router;