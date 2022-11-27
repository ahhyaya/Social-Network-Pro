const { Schema, model } = require("mongoose");
const { format_date } = require("../utils/format-date");

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
    createdAt: {
      type: Date,
      default: Date.now,
      //TODO: Use a getter method to format the timestamp on query
      get: (date) => {
        return format_date(date);
      }
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//TODO: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = reactionSchema;
