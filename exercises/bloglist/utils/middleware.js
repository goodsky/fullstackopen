const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(`Unhandled error (${error.name})`, error.message);

  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'CastError') {
    response.status(400).json({ error: 'invalid id' });
  }

  next(error);
};

const requestLogger = (request, response, next) => {
  logger.info(`${request.method} ${request.path} ${JSON.stringify(request.body)}`);

  next();
};

module.exports = {
  errorHandler,
  requestLogger,
};
