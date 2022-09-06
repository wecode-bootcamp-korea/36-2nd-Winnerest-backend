const { appDataSource } = require("./dataSource");

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

const getUserInfo = async (userId) => {
  return await appDataSource.query(`
  SELECT
    u.nickname,
    u.profile_img_url profileUrl,
    u.kakao_id kakaoId,
    (
      SELECT COUNT(follower.follower_id)
      FROM follower
      INNER JOIN user
        ON user.id = follower.following_id
      WHERE user.id = u.id
    ) follower,
    JSON_ARRAYAGG(JSON_OBJECT(
      'boardId', board.id,
      'boardTitle', board.title)
    ) board
	FROM user u
	INNER JOIN board
	  ON u.id = board.user_id
	WHERE u.id = ?;`, [userId]);
}

module.exports = {
  createUser,
  getUserByKakaoId,
  getUserById,
  getUserInfo
}