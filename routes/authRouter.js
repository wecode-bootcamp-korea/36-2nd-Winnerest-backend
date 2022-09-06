const express = require("express");
const authController = require("../controllers/authController");
const errorHandler = require("../middlewares/errorHandler");
const auth = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.get("/kakao-login", errorHandler(authController.logIn));
authRouter.get("/", errorHandler(auth.validationToken), errorHandler(authController.getUserInfo));
authRouter.post('/follow/:followerUserId', errorHandler(auth.validationToken), errorHandler(authController.createFollower));
authRouter.delete('/follow/:followerUserId', errorHandler(auth.validationToken), errorHandler(authController.deleteFollower));

module.exports = { authRouter };