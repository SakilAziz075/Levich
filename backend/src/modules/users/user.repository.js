const { v4: uuid } = require("uuid");

class UserRepository {
  constructor() {
    this.users = new Map();
  }

  create(username) {
    const user = {
      id: uuid(),
      username
    };

    this.users.set(user.id, user);
    return user;
  }

  getById(id) {
    return this.users.get(id);
  }
}

module.exports = new UserRepository();
