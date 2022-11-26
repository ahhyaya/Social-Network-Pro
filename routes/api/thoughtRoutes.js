const router = require("express").Router();

const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
  createNewReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
// get all thoughts/create new thought
router.route("/").get(getAllThoughts).post(createNewThought);

// /api/thoughts/:thoughtId
// get a single thought by ID / update a thought by ID/ remove a thought by ID
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// create new reaction stored in a single thought's reactions array field
// pull and remove a reaction by the reaction's reactionId value
router
  .route("/:thoughtId/reactions")
  .post(createNewReaction)
  .delete(removeReaction);

module.exports = router;
