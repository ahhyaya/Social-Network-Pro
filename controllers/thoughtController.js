const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: `No thought with this ID!` })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  createNewThought(req, res) {
    Thought.create(req.body)
      //TODO: push the created thought's _id to the associated user's thoughts array field
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: `No thought with this ID!` })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: `No thought with this ID!` })
          : res.json({ message: `Thought deleted!` });
      })
      .catch((err) => res.status(500).json(err));
  },
  //TODO: POST to create a reaction stored in a single thought's reactions array field
  createNewReaction(req, res) {
    console.log(`===== You are adding a reaction =====`);
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: `No thought with this ID!` })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  //TODO: DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: `No thought with this ID!` })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
