const { Schema, model } = require('mongoose');

// user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // email verification
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ], // thoughts array references thought
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ] // friends array references user
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

// virtual to count friends length
userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;