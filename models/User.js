const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //TODO: Must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts: [
            {
                type: Schema.Type.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Type.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        //TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
    }
)

const User = model('User', userSchema);
module.export = User;