const reviewService = require("../services/reviewService");
const ErrorCreater = require("../middlewares/errorCreater");

const postReviewOfPin = async (req, res) => {
  
    const { contents } = req.body;
    
    const pinId = req.params.pinId
    const userId = req.user.id
    
      if (!contents || !pinId) {
        throw new ErrorCreater("KEY_ERROR", 400)
      }
      
      if (contents.trim().length === 0) {
      
        throw new ErrorCreater("CONTENTS_NOT_DEFINED", 400)
    }
      await reviewService.postReviewOfPin(contents, pinId, userId);
      return res.status(201).json({
        message: "REVIEW_POSTED_SUCCESS",
      });
    };

const deleteReview = async (req, res) => {
  
    const reviewId = req.params.reviewId
    const userId = req.user.id
    
      if (!reviewId){
        throw new ErrorCreater("KEY_ERROR", 400)
      }
    
        await reviewService.deleteReview(reviewId, userId);
        return res.status(200).json({
          message: "REVIEW_DELETE_SUCCESS",
        })
      };

const getReviewsOfPin = async (req, res) => {
      
    const pinId  = req.params.pinId
    if ( !pinId) {
      throw new ErrorCreater("KEY_ERROR", 400)
    }
    
    const reviewList = await reviewService.getReviewsOfPin(pinId);

    res.status(200).json({ reviewList : reviewList});
   };

const patchReviewOfPin = async (req, res) => {
  
    const { contents } = req.body;
    const userId = req.user.id
    const reviewId = req.params.reviewId

    if (!reviewId || !contents) {
      throw new ErrorCreater("KEY_ERROR", 400)
    }

    if (contents.trim().length === 0) {
      throw new ErrorCreater("CONTENTS_NOT_DEFINED", 400)
    }
    await reviewService.patchReviewOfPin(reviewId ,contents, userId);
    
    return res.status(200).json({
      message: "REVIEW_EDITED_SUCCESS",
    });}

const postLikeOfReview = async (req, res) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id
    if (!reviewId) {
      throw new ErrorCreater("KEY_ERROR", 400)
    }

    await reviewService.postLikeOfReview(reviewId, userId);
    return res.status(201).json({
      message: "POST_LIKE_SUCCESS",
    });}

module.exports ={postReviewOfPin, deleteReview, getReviewsOfPin, patchReviewOfPin, postLikeOfReview}

