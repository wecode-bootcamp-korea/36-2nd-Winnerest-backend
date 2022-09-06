const pinDao = require('../models/pinDao');
const ErrorCreater = require('../middlewares/errorCreater');

const getMainPins = async(userId, pageSize, page) => {
    return await pinDao.getMainPinInfos(userId, pageSize = 10, page = 1);
}

const getRecommendPins = async(tagId, pageSize, page) => {
    return await pinDao.getRecommendPins(tagId, pageSize = 10, page = 1);
}

const getPinInfo = async (pinId) => {
    const [pinInfos] = await pinDao.getPinInfo(pinId);
    pinInfos.tagIds = JSON.parse(pinInfos.tagIds);
    return pinInfos;
}

const deletePin = async (pinId, userId) => {
    
    const checkMyPin = await pinDao.checkMyPin(pinId, userId)
    
    if(!checkMyPin)
    {throw new ErrorCreater("INVAILD_ACCESS", 404)}
    
    return await pinDao.deleteMyPin(pinId);
}

const patchPin = async (pinId, boardId, title, contents, userId) => {
    
    const checkMyPin = await pinDao.checkMyPin(pinId, userId)
    
    if(!checkMyPin)
    {throw new ErrorCreater("INVAILD_ACCESS", 404)}
    
    return await pinDao.patchMyPin(pinId, boardId, title, contents)
}

module.exports = {
getMainPins, getRecommendPins, getPinInfo, getPinInfo, deletePin, patchPin
}