require('dotenv').config();

const {
  JWT_SECRET,
  MONGODB_URI,
  PORT,
  TEST_MONGODB_URI,
} = process.env;

const ENVIRONMENT_MONGODB_URI = process.env.NODE_ENV === 'test'
  ? TEST_MONGODB_URI
  : MONGODB_URI;

const SALT_ROUNDS = 10;

module.exports = {
  JWT_SECRET,
  MONGODB_URI: ENVIRONMENT_MONGODB_URI,
  PORT,
  SALT_ROUNDS,
};
