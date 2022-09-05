const ErrorCreater = require("../middlewares/errorCreater");
const pinDao = require('../models/pinDao');

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

const createPin = async (boardId, title, contents, tagIds, imgUrl, userId) => {
    
    const myBoard = await pinDao.checkMyBoard(boardId, userId)
    
    if(!myBoard)
    {throw new ErrorCreater("INVAILD_ACCESS", 404)}
    
    const createMyPin = await pinDao.createMyPin(boardId, title, contents, tagIds, imgUrl);
}

module.exports = {
    getMainPins, getRecommendPins, getPinInfo, getPinInfo, deletePin, patchPin, createPin}