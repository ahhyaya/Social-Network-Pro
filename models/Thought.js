const { Schema, model, default: mongoose } = require("mongoose");
const { format_date } = require('../utils/format-date');

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true, maxlenght: 280 },
  username: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //TODO: Use a getter method to format the timestamp on query
      get: (date) => {
        return format_date(date);
      }
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);
module.exports = Thought;
