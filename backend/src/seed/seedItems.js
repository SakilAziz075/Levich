const { v4: uuid } = require("uuid");
const auctionRepository = require("../modules/auction/auction.repository");

function seedItems() {
  const now = Date.now();

  const items = [
    {
      id: uuid(),
      title: "MacBook Pro M2",
      startingPrice: 500,
      currentBid: 500,
      highestBidder: null,
      endTime: now + 5 * 60 * 1000,
      version: 0
    },
    {
      id: uuid(),
      title: "iPhone 15",
      startingPrice: 400,
      currentBid: 400,
      highestBidder: null,
      endTime: now + 7 * 60 * 1000,
      version: 0
    },
    {
      id: uuid(),
      title: "PlayStation 5",
      startingPrice: 300,
      currentBid: 300,
      highestBidder: null,
      endTime: now + 10 * 60 * 1000,
      version: 0
    }
  ];

  auctionRepository.bulkInsert(items);
}

module.exports = seedItems;
