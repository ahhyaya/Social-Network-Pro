const { User, Thought } = require("../models");

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        console.log("reaction", thoughts[0].reactions)
        res.json(thoughts)
      })
      .catch((err) => res.status(500).json(err));
  },
  // get a single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: `No thought with this ID!` })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createNewThought(req, res) {
    Thought.create(req.body)
      // push the created thought's _id to the associated user's thoughts array field
      .then((thought) => {
       return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id }},
          { runValidators: true, new: true }
        )
      })
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // update a thought by ID
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
  // delete a thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: `No thought with this ID!` })
          : res.json({ message: `Thought deleted!` });
      })
      .catch((err) => res.status(500).json(err));
  },
  // create a new reaction to the thought by thought's ID
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
          ? res.status(404)
            .json({ message: `No thought with this ID!` })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
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
