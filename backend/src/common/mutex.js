/*
 * Lightweight in-memory mutex for per-resource locking.
 *
 * ----
 * Prevents race conditions when multiple async operations
 * attempt to modify the same logical resource (auction item).
 *
 * How it will work:
 * ----
 * - Each resource is identified by a unique key (itemId)
 * - Only one execution path may hold a lock for a key at a time
 * - Others spin briefly until lock is released
 *
 * NOTE:
 * This approach will sufficient for a single Node.js instance.
 * In horizontally scaled environments, replace with Redis-based
 * distributed locks or DB transactions but since Render donot provide free DB
 * we are using this approach.
 */

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
