const pinDao = require('../models/pinDao')
const error = require("../middlewares/errorCreater");

const createPin = async (boardId, title, contents, tagId, imgUrl) => {
    
    const Tag = await pinDao.getMyPinTag(tagId)
    
    if(!Tag)

    {throw new error("INVAILD TAG", 409)}
    const createMyPin = await pinDao.createMyPin(boardId, title, contents, tagId, imgUrl);
    return createMyPin}

module.exports = {createPin}