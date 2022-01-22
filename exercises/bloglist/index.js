const http = require('http');

const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

// app is an express application
// which is just a request listener callback to be used in Node's http server
const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
