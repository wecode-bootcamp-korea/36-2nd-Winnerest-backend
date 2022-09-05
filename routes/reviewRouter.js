const express = require("express");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");

const reviewRouter = express.Router();

reviewRouter.post("/:pinId", errorHandler(auth.validationToken), errorHandler(reviewController.postReviewOfPin));


module.exports = {
    reviewRouter
}