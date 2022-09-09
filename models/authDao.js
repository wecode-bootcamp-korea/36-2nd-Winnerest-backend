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
    u.id userId,
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

const verifiedUserId = async (followerUserId) => {
  const [verifiedResult] = await appDataSource.query(`
  SELECT EXISTS(
    SELECT * FROM user
    WHERE id = ?) verifiedResult`, [followerUserId]);
  return verifiedResult;
}

const duplicatedFollower = async (followingUserId, followerUserId) => {
  const [duplicatedResult] = await appDataSource.query(`
  SELECT EXISTS(
    SELECT * FROM follower
    WHERE following_id = ? 
    and follower_id =?) duplicatedResult`, [followingUserId, followerUserId]);
  return duplicatedResult;
}

const createFollower = async (followingUserId, followerUserId) => {
  return await appDataSource.query(`
  INSERT INTO follower (following_id, follower_id) VALUES (?, ?);`,
  [followingUserId, followerUserId]);
}

const deleteFollower = async (followingUserId, followerUserId) => {
  return await appDataSource.query(`
  DELETE FROM follower
  WHERE following_id = ? AND follower_id =?`, [followingUserId, followerUserId]);
}

module.exports = {
  createUser,
  getUserByKakaoId,
  getUserById,
  getUserInfo,
  verifiedUserId,
  createFollower,
  duplicatedFollower,
  deleteFollower
}