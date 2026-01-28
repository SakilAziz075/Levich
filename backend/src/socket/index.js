const { Server } = require("socket.io");
const registerBidGateway = require("./bid.gateway");
const userService = require("../modules/users/user.service");
const startAuctionScheduler = require("../modules/auction/auction.scheduler");


function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  // Socket Auth Middleware
  io.use((socket, next) => {
    const userId = socket.handshake.auth?.userId;

    if (!userId) {
      return next(new Error("No userId provided"));
    }

    const user = userService.getUser(userId);

    if (!user) {
      return next(new Error("Invalid user"));
    }

    socket.user = user;   // attach validated user
    next();
  });

  registerBidGateway(io);
  startAuctionScheduler(io);
}

module.exports = initSocket;
