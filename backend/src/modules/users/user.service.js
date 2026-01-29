const { v4: uuid } = require("uuid");

class UserService {
  constructor() {
    this.users = new Map();          // id -> user
    this.usersByName = new Map();   // username -> user
  }

  createUser(username) {

    const normalized = username.toLowerCase();

    // If username exists, return same user
    if (this.usersByName.has(normalized)) {
      return this.usersByName.get(normalized);
    }

    const user = {
      id: uuid(),
      username
    };

    this.users.set(user.id, user);
    this.usersByName.set(normalized, user);

    return user;
  }

  getUser(id) {
    return this.users.get(id);
  }
}

module.exports = new UserService();
