const auctionRepository = require("./auction.repository");

class AuctionService {
  getAllItems() {
    return auctionRepository.getAll();
  }

  getItemById(id) {
    return auctionRepository.getById(id);
  }
}

module.exports = new AuctionService();
