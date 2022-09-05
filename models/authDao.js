const { appDataSource } = require("./dataSource");
const ErrorCreater = require("../middlewares/errorCreater");

const createUser = async (nickname, kakaoId, profileImgUrl) => {

  const user = await appDataSource.query(
    `INSERT INTO user (
      nickname,
      kakao_id,
      profile_img_url
    ) VALUES (?,?,?)`,
    [nickname, kakaoId, profileImgUrl]
  );
  return user;
};

const getUserByKakaoId = async (kakaoId) => {

  const [user] = await appDataSource.query(
    `SELECT *
      FROM user u
      WHERE u.kakao_id = ?
      `,
    [kakaoId]
  );
  return user;
};

const getUserById = async (userId) => {

  const [user] = await appDataSource.query(
    `SELECT *
      FROM user u
      WHERE u.id = ?
      `,
    [userId]
  );
  return user;
};

module.exports = { createUser, getUserByKakaoId, getUserById }