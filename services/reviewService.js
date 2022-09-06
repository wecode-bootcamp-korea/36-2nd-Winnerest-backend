const reviewDao = require("../models/reviewDao");
const { validationId } = require("../utils/validation");
const ErrorCreater = require("../middlewares/errorCreater");

const postReviewOfPin = async (contents, pinId, userId) => {
    validationId(pinId);
  
    const postReview = await reviewDao.postMyReview(contents, pinId, userId);
    return postReview;
  };

const deleteReview = async (reviewId, userId) => {
    validationId(reviewId)

    const myReview = await reviewDao.checkMyReview(reviewId, userId)
    
    if(!myReview) {
        throw new ErrorCreater("INVAILD_ACCESS", 404)
    }
    const deleteMyReview = await reviewDao.deleteMyReview(reviewId, userId);
  
    return deleteMyReview;
  };

const getReviewsOfPin = async (pinId) => {
    validationId(pinId);
  
    const getReviewListOfPin= await reviewDao.getReviewListOfPin(pinId);
  
    return getReviewListOfPin;
  };

  module.exports ={postReviewOfPin, deleteReview, getReviewsOfPin}

