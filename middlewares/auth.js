const authDao = require("../models/authDao");
const jwt = require("jsonwebtoken");
const error = require("../middlewares/errorCreater");

const validationToken = async (req, res, next) => {
 
    const accessToken = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = decode.sub;
    const user = await authDao.getUserById(userId);

    if (!user) {
      throw new error("USER_NOT_DEFINED",409)
    }
      req.user = userId;
      next();
    }

module.exports = {
  validationToken,
};