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

module.exports ={postReviewOfPin}