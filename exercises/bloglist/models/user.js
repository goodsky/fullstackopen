/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog', // reference to 'Blog' model
    },
  ],
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
