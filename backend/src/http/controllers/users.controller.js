const userService = require("../../modules/users/user.service");

exports.createSession = (req, res) => {
  try {
    const { username } = req.body;
    const user = userService.createSession(username);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
