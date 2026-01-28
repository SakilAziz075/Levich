const express = require("express");
const controller = require("../controllers/time.controller");

const router = express.Router();

router.get("/", controller.getServerTime);

module.exports = router;
