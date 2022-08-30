const jwt = require("jsonwebtoken")
const userDao = require("../models/authDao");
const error = require("../middlewares/errorCreater");

const logIn = async (nickname, kakaoId, profileImgUrl) => {

    const user = await userDao.getUserByKakaoId(kakaoId);
    const jwtSign = {sub: user.insertId, exp: Math.floor(Date.now()/1000) + (600*600)} 
    
    if (!user) {
      const user = await userDao.createUser(nickname, kakaoId, profileImgUrl);
      return jwt.sign(jwtSign, process.env.JWT_SECRET);
    }
    
    else{
      return jwt.sign(jwtSign, process.env.JWT_SECRET);
    }
  };
  
  module.exports = {logIn};