const http = require("http");
const app = require("./app");

const logger = require("./common/logger");
const initSocket = require("./socket");
const seedItems = require("./seed/seedItems");

// Safety nets
process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

const server = http.createServer(app);

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 4000;

seedItems();
initSocket(server);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
