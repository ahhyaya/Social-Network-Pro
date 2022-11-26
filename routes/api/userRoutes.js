const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addNewFriend,
  removeSingleFriend,
} = require("../../controllers/userController");

// /api/users
// get all users/ create new user
router.route("/").get(getAllUsers).post(createNewUser);

// /api/users/:userId
// get a single user/delete a user by ID/ update a user by ID
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// TODO : BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId
// add a new friend to users friend list/ remove a friend from users friend list by ID
router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(removeSingleFriend);

module.exports = router;
