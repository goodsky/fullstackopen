const bcrypt = require('bcrypt');
const router = require('express').Router();

const config = require('../utils/config');
const logger = require('../utils/logger');
const User = require('../models/user');

router.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', {
      title: 1, author: 1, url: 1, likes: 1, id: 1,
    });

  logger.info('Read users', users.length);
  response.status(200).json(users);
});

router.post('/', async (request, response) => {
  const { body } = request;

  if (!body.password || body.password.length < 3) {
    response.status(400).json({ error: 'invalid password' });
    return;
  }

  const passwordHash = await bcrypt.hash(body.password, config.SALT_ROUNDS);

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name,
  });

  const createdUser = await user.save();
  response.status(201).json(createdUser);
});

module.exports = router;
