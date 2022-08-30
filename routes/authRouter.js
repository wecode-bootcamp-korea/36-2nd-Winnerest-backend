const express = require("express");
const authController = require("../controllers/authController");
const errorHandler = require("../middlewares/errorHandler");

const authRouter = express.Router();

authRouter.get("/kakao-login", errorHandler(authController.logIn));

module.exports = { authRouter };