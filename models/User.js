const { Schema, model, default: mongoose } = require("mongoose");
const { ObjectId } = require("mongoose").Types;


const validateEmail = function(email) {
  const regex =  /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
  return regex.test(email);
};

const userSchema = new Schema(
  {
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, `Please enter your email`],
      unique: true,
      lowercase: true,
      // Must match a valid email address
      validate: [validateEmail, `Please enter a valid email` ],
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;
