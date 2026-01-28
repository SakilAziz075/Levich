const auctionService = require("../modules/auction/auction.service");
const {
  AuctionEndedError,
  OutbidError,
} = require("../modules/auction/auction.errors");
const logger = require("../common/logger");

function registerBidGateway(io) {
  io.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId;

    socket.on("BID_PLACED", async (payload) => {
      try {
        const { itemId, amount } = payload;

        const userId = socket.user.id;

        const updatedItem = await auctionService.placeBid(
          itemId,
          amount,
          userId,
        );

        io.emit("UPDATE_BID", updatedItem);
      } catch (err) {
        if (
          err.name === "AuctionEndedError" ||
          err.name === "OutbidError" ||
          err.name === "ValidationError"
        ) {
          socket.emit("BID_ERROR", { message: err.message });
        } else {
          logger.error("Bid processing failed", {
            error: err,
            stack: err.stack,
          });

          socket.emit("BID_ERROR", { message: "Internal error" });
        }
      }
    });
  });
}

module.exports = registerBidGateway;
