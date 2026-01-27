const express = require("express");
const controller = require("../controllers/items.controller");

const router = express.Router();

router.get("/", controller.getItems);

module.exports = router;
