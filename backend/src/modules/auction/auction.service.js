const auctionRepository = require("./auction.repository");
const mutex = require("../../common/mutex");
const {
  AuctionEndedError,
  OutbidError
} = require("./auction.errors");

const { validateBidAmount } = require("./auction.validator");
const userService = require("../users/user.service");


/**
 * AuctionService
 * --------------
 * Contains all business logic related to auctions.
 * Concurrency-sensitive operations (bidding) are handled
 * inside atomic critical sections protected by mutex locks.
 */

class AuctionService {

  getAllItems() {
    return auctionRepository.getAll();
  }

  /**
   * Atomically places a bid on an auction item.
   *
   * Concurrency Guarantee:
   * ---------------------
   * The sequence:
   *   read item -> validate -> update -> persist
   * is executed inside a per-item mutex lock.
   *
   * If two users submit the same bid at the same millisecond:
   * - First caller acquires the lock and succeeds
   * - Second caller waits, then observes updated price and fails
   *
   * This prevents race conditions and ensures consistency.
   *
   * @param {string} itemId
   * @param {number} amount
   * @param {string} userId
   * @returns updated auction item
   */


  async placeBid(itemId, amount, userId) {
    validateBidAmount(amount);

    // -------- ENTER CRITICAL SECTION ----------
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
    // -------- EXIT CRITICAL SECTION ----------
  }
}

module.exports = new AuctionService();
