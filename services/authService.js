const jwt = require("jsonwebtoken")
const userDao = require("../models/authDao");
const ErrorCreater = require("../middlewares/errorCreater");
const fetch = require('node-fetch')

const logIn = async (accessToken) => {

  const response = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
    .then(res => res.json())

  const nickname = response.properties.nickname
  const kakaoId = response.id
  const profileImgUrl = response.properties.thumbnail_image

  if (!nickname || !kakaoId) {
    throw new ErrorCreater("KEY_ERROR", 400)
  }

  let user = await userDao.getUserByKakaoId(kakaoId);

  if (!user) {
    const result = await userDao.createUser(nickname, kakaoId, profileImgUrl);
    user = await userDao.getUserById(result.insertId)
  }
  return jwt.sign({ sub: user.id, exp: Math.floor(Date.now() / 1000) + (600 * 600) }, process.env.JWT_SECRET);
}

const getUserInfo = async(userId) => {
  const [daoDatas] = await userDao.getUserInfo(userId);
  daoDatas.board = JSON.parse(daoDatas.board)
  return daoDatas;
}

module.exports = {
  logIn,
  getUserInfo
};