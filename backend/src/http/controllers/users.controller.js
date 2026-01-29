

const userService = require("../../modules/users/user.service");

exports.createSession = (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const user = userService.createUser(username);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getUser = (req, res) => {
  const user = require("../../modules/users/user.service")
    .getUser(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(user);
};