// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get a single user
  // TODO : GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: `No user with this ID!` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete a single user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        if(!user) {
          return res.status(404).json({ message: `No user with this ID!` })
        }
        else{
          Thought.deleteMany(
              { _id: {$in: user.thoughts } } );
           res.json({ message: `User successfully deleted!` })
          }
        })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add a new friend to user's friend list
  addNewFriend(req, res) {
    console.log(`===== You are adding a friend =====`);
    console.log(req.params.friendId, req.params.userId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: `No user found with this ID!` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a friend from user's friend list by ID
  removeSingleFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:req.params.friendId  } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: `No user found with this ID!` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
