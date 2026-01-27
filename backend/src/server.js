// HTTP Server + Socket

const http = require("http");
const app = require("./app");

const { PORT } = require("./config");
const logger = require("./common/logger");

const initSocket = require("./socket");
const seedItems = require("./seed/seedItems");

const server = http.createServer(app);

seedItems();
initSocket(server);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
