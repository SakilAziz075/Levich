const { Server } = require("socket.io");
const registerBidGateway = require("./bid.gateway");

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  registerBidGateway(io);
}

module.exports = initSocket;
