const express = require("express");
const pinController = require("../controllers/pinController");
const errorHandler = require("../middlewares/errorHandler");

const pinRouter = express.Router();

pinRouter.post("/", errorHandler(pinController.createPin))

module.exports = { pinRouter };
