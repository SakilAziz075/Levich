const { v4: uuid } = require("uuid");
const auctionRepository = require("../modules/auction/auction.repository");

function seedItems() {

  // Check if any active auction already exists
  const existing = auctionRepository.getAll();

  const hasActiveAuction = existing.some(
    item => Date.now() < item.endTime
  );

  if (hasActiveAuction) {
    console.log("Active auctions already exist. Skipping seeding.");
    return;
  }

  const now = Date.now();

  const items = [
    {
      id: uuid(),
      title: "MacBook Pro M2",
      startingPrice: 500,
      currentBid: 500,
      highestBidder: null,
      bidHistory: [],
      endTime: now + 5 * 60 * 1000,
      version: 0
    },
    {
      id: uuid(),
      title: "iPhone 15",
      startingPrice: 400,
      currentBid: 400,
      highestBidder: null,
      bidHistory: [],
      endTime: now + 7 * 60 * 1000,
      version: 0
    },
    {
      id: uuid(),
      title: "PlayStation 5",
      startingPrice: 300,
      currentBid: 300,
      highestBidder: null,
      bidHistory: [],
      endTime: now + 10 * 60 * 1000,
      version: 0
    }
  ];

  auctionRepository.bulkInsert(items);

  console.log("Seeded items:", items.length);
  console.log("Seeded item IDs:", items.map(i => i.id));
}

module.exports = seedItems;
