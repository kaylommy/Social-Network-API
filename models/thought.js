const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// created schema for thoughts
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
           reactionSchema
        ], // reactions subdocument
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

//create virtual for the reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);
module.exports = Thought;