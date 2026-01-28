const auctionRepository = require("./auction.repository");
const mutex = require("../../common/mutex");
const {
  AuctionEndedError,
  OutbidError
} = require("./auction.errors");
const { validateBidAmount } = require("./auction.validator");
const userService = require("../users/user.service");

class AuctionService {

  getAllItems() {
    return auctionRepository.getAll();
  }

  async placeBid(itemId, amount, userId) {
    validateBidAmount(amount);

    await mutex.acquire(itemId);

    try {
      const item = auctionRepository.getById(itemId);
      if (!item) throw new Error("Item not found");

      if (Date.now() > item.endTime) {
        throw new AuctionEndedError();
      }

      if (amount <= item.currentBid) {
        throw new OutbidError();
      }

      const bidder = userService.getUser(userId);
      if (!bidder) throw new Error("Invalid user");

      const bidEntry = {
        userId: bidder.id,
        username: bidder.username,
        amount,
        time: Date.now()
      };

      const updatedItem = {
        ...item,
        currentBid: amount,
        highestBidder: {
          id: bidder.id,
          username: bidder.username
        },
        bidHistory: [...item.bidHistory, bidEntry],
        version: item.version + 1
      };

      auctionRepository.save(updatedItem);
      return updatedItem;

    } finally {
      mutex.release(itemId);
    }
  }
}

module.exports = new AuctionService();
