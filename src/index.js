const { createServer } = require('http');

const config = require('./config');

const app = require('./server');

const server = createServer(app);

server.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
