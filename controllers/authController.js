const authService = require("../services/authService");
const ErrorCreater = require("../middlewares/errorCreater");

const logIn = async (req, res) => {
  
    const accessToken = req.headers.authorization
    const token = await authService.logIn(accessToken)
    res.status(200).json({ accessToken: token })
              }
module.exports={logIn}
