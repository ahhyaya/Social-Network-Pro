const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
      //TODO: Use a getter method to format the timestamp on query
      get: (date) => date.toISOString().split("T")[0],
    },
  },
  {
    toJSON: {
      getter: true,
    },
    id: false,
  }
);

//TODO: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = reactionSchema;
