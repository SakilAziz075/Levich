const logger = require("../common/logger");

function registerBidGateway(io) {
  io.on("connection", (socket) => {
    logger.info("Client connected", { id: socket.id });

    socket.on("disconnect", () => {
      logger.info("Client disconnected", { id: socket.id });
    });
  });
}

module.exports = registerBidGateway;
