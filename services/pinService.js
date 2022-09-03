const pinDao = require('../models/pinDao')
const ErrorCreater = require("../middlewares/errorCreater");

const createPin = async (boardId, title, contents, tagId, imgUrl) => {
     const createMyPin = await pinDao.createMyPin(boardId, title, contents, tagId, imgUrl);
}

const deletePin = async (pinId, userId) => {
    const myPin = await pinDao.checkMyPin(pinId, userId)
    
    if(!myPin)
    {throw new ErrorCreater("INVAILD_ACCESS", 404)}
    
    const deleteMyPin = await pinDao.deleteMyPin(pinId);
}

module.exports = {createPin, deletePin}