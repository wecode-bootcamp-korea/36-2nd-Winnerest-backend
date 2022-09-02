const authService = require("../services/authService");
const fetch = require('node-fetch')
const ErrorCreater = require("../middlewares/errorCreater");

const logIn = async (req, res) => {
  
    const accessToken = req.headers.authorization.split(" ")[1];

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
          const profileImgUrl =response.properties.thumbnail_image
          
        if ( !nickname || !kakaoId ) {
            throw new ErrorCreater("KEY_ERROR", 400)}
            
        const Token = await authService.logIn(nickname, kakaoId, profileImgUrl)
        res.status(200).json({ accessToken: Token })
              }

module.exports={logIn}
