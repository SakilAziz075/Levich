class AuctionRepository {
  constructor() {
    this.items = new Map();
  }

  getAll() {
    return Array.from(this.items.values());
  }

  getById(id) {
    return this.items.get(id);
  }

  save(item) {
    this.items.set(item.id, item);
    return item;
  }

  bulkInsert(items) {
    items.forEach(item => {
      this.items.set(item.id, item);
    });
  }
}

module.exports = new AuctionRepository();
