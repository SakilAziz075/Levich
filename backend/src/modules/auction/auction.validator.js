const { ValidationError } = require("./auction.errors");

exports.validateBidAmount = (amount) => {
  if (typeof amount !== "number" || amount <= 0) {
    throw new ValidationError("Invalid bid amount");
  }
};
