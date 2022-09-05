const reviewDao = require("../models/reviewDao");
const { validationId } = require("../utils/validation");
const ErrorCreater = require("../middlewares/errorCreater");

const postReviewOfPin = async (contents, pinId, userId) => {
    validationId(pinId);
  
    const postReview = await reviewDao.postMyReview(contents, pinId, userId);
    return postReview;
  };

module.exports ={postReviewOfPin}