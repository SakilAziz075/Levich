// One active modifier per item
// Deterministic ordering
// Simple and effective


class Mutex {
  constructor() {
    this.locks = new Map();
  }

  async acquire(key) {
    while (this.locks.get(key)) {
      await new Promise(resolve => setTimeout(resolve, 1));
    }
    this.locks.set(key, true);
  }

  release(key) {
    this.locks.delete(key);
  }
}

module.exports = new Mutex();
