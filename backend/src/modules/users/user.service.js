const userRepository = require("./user.repository");

class UserService {
  createSession(username) {
    if (!username || username.trim().length < 2) {
      throw new Error("Invalid username");
    }

    return userRepository.create(username.trim());
  }

  getUser(userId) {
    return userRepository.getById(userId);
  }
}

module.exports = new UserService();
