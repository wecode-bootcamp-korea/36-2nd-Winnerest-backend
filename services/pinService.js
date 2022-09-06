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

module.exports = {
    getMainPins,
    getRecommendPins,
    getPinInfo
}