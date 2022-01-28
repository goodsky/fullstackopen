require('dotenv').config();

const { MONGODB_URI, TEST_MONGODB_URI, PORT } = process.env;

const ENVIRONMENT_MONGODB_URI = process.env.NODE_ENV === 'test'
  ? TEST_MONGODB_URI
  : MONGODB_URI;

module.exports = {
  MONGODB_URI: ENVIRONMENT_MONGODB_URI,
  PORT,
};
