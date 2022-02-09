const jwt = require('jsonwebtoken');

const config = require('./config');
const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(`Unhandled error (${error.name})`, error.message);

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'invalid id' });
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'invalid token' });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }

  next(error);
};

const requestLogger = (request, response, next) => {
  const bodyToLog = { ...request.body };
  delete bodyToLog.password;

  logger.info(`${request.method} ${request.path} ${JSON.stringify(bodyToLog)}`);

  next();
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring('Bearer '.length);
    request.token = token;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const { token } = request;
  if (token) {
    const userToken = jwt.verify(request.token, config.JWT_SECRET);
    request.user = userToken;
  }

  next();
};

module.exports = {
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
