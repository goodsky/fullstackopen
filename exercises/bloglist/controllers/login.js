const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const config = require('../utils/config');
const logger = require('../utils/logger');
const User = require('../models/user');

router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordsAreSame = user && password
    && await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordsAreSame) {
    logger.info('Failed log in attempt for user', username);
    response.status(401).json({ error: 'Username of password is incorrect.' });
    return;
  }

  const payload = {
    userId: user.id,
    username: user.username,
    name: user.name,
  };

  logger.info('Successful log in attempt for user', username);

  const token = jwt.sign(payload, config.JWT_SECRET);
  response.status(200).json({ token });
});

module.exports = router;
