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

function createNewAuction() {
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];
  const startPrice = Math.floor(300 + Math.random() * 400);

  return {
    id: uuid(),
    title,
    startingPrice: startPrice,
    currentBid: startPrice,
    highestBidder: null,
    bidHistory: [],
    endTime: Date.now() + 5 * 60 * 1000,
    version: 0
  };
}

function startAuctionScheduler(io) {
  setInterval(() => {
    const items = auctionRepository.getAll();

    items.forEach(item => {
      if (Date.now() > item.endTime) {
        const newItem = createNewAuction();
        auctionRepository.save(newItem);
        io.emit("NEW_AUCTION", newItem);
      }
    });
  }, 2000);
}

module.exports = startAuctionScheduler;
