exports.getServerTime = (req, res) => {
  res.json({
    serverTime: Date.now()
  });
};
