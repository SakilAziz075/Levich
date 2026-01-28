class AuctionEndedError extends Error {
  constructor() {
    super("Auction has ended");
    this.name = "AuctionEndedError";
  }
}

class OutbidError extends Error {
  constructor() {
    super("Outbid");
    this.name = "OutbidError";
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = {
  AuctionEndedError,
  OutbidError,
  ValidationError
};
