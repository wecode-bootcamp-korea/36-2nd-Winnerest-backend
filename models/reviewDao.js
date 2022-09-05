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

module.exports = {postMyReview}