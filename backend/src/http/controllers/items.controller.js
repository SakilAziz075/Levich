const auctionService = require("../../modules/auction/auction.service");

exports.getItems = async (req, res) => {
  const items = auctionService.getAllItems();
  res.json(items);
};
