const { v4: uuid } = require("uuid");
const auctionRepository = require("./auction.repository");

const TITLES = [
  "MacBook Pro M2",
  "iPhone 15",
  "PlayStation 5",
  "iPad Pro",
  "AirPods Pro",
  "Apple Watch",
  "Nintendo Switch"
];

function createAuction() {
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];
  const price = Math.floor(300 + Math.random() * 400);

  return {
    id: uuid(),
    title,
    startingPrice: price,
    currentBid: price,
    highestBidder: null,
    bidHistory: [],
    endTime: Date.now() + 5 * 60 * 1000,
    version: 0
  };
}

function startAuctionScheduler(io) {
  setInterval(() => {

    const items = auctionRepository.getAll();

    const active = items.filter(
      i => Date.now() < i.endTime
    );

    const expired = items.filter(
      i => Date.now() >= i.endTime
    );

    // Remove expired
    expired.forEach(i => auctionRepository.delete(i.id));

    // Replace expired with new auctions
    const toCreate = expired.length;

    for (let i = 0; i < toCreate; i++) {
      const newItem = createAuction();
      auctionRepository.save(newItem);
      io.emit("NEW_AUCTION", newItem);
    }

  }, 2000);
}

module.exports = startAuctionScheduler;
