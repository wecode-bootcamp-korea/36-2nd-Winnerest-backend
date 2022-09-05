const express = require("express");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");

const reviewRouter = express.Router();

reviewRouter.post("/:pinId", errorHandler(auth.validationToken), errorHandler(reviewController.postReviewOfPin));
reviewRouter.delete("/:reviewId", errorHandler(auth.validationToken), errorHandler(reviewController.deleteReview));
reviewRouter.get("/pin/:pinId", errorHandler(auth.validationToken), errorHandler(reviewController.getReviewsOfPin));
reviewRouter.post("/:reviewId/like", errorHandler(auth.validationToken), errorHandler(reviewController.postLikeOfReview));
reviewRouter.patch("/:reviewId", errorHandler(auth.validationToken), errorHandler(reviewController.patchReviewOfPin));

module.exports = {
    reviewRouter
}