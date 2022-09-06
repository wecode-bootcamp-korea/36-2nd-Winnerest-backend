const { appDataSource } = require("./dataSource");
const ErrorCreater = require("../middlewares/errorCreater");

const postMyReview = async (contents, pinId, userId) => {
    return await appDataSource.query(
      `INSERT INTO review(
                contents, 
                pin_id, 
                user_id
            ) VALUES (?, ?, ?)`,

      [contents, pinId, userId]
    );
};

const checkMyReview = async (reviewId, userId) => {
    
    const [myReview] = await appDataSource.query(
        `SELECT *
            FROM review
            WHERE user_id = ${userId}
            AND id = ${reviewId}`
         );
         return myReview
       } 

const deleteMyReview = async (reviewId, userId) => {

    return await appDataSource.query(
        `DELETE
            FROM review
            WHERE user_id = ${userId}
            AND id = ${reviewId}`
           );
         } 

const getReviewListOfPin = async (pinId) => {

    const reviewList = await appDataSource.query(
        `SELECT 
          r.id, 
          r.contents, 
          r.created_at, 
          u.nickname,
          (
            SELECT count(*) 
            FROM likes l
            WHERE l.review_id = r.id
          ) AS likes
          FROM review r 
          LEFT JOIN user u 
          ON r.user_id = u.id
          WHERE r.pin_id = ${pinId}
          `
     );
     return reviewList
  }
module.exports ={postMyReview, checkMyReview, deleteMyReview, getReviewListOfPin}