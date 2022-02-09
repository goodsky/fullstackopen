/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'anon' },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to 'User' model
    required: true,
  },
});

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
