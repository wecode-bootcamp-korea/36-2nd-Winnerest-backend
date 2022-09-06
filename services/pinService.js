const pinDao = require('../models/pinDao');

const getMainPins = async(userId, pageSize, page) => {
    return await pinDao.getMainPinInfos(userId, pageSize, page);
}

const getPinInfo = async (pinId) => {
    const [pinInfos] = await pinDao.getPinInfo(pinId);
    pinInfos.tagIds = JSON.parse(pinInfos.tagIds);
    return pinInfos;
}

module.exports = {
    getMainPins,
    getPinInfo
}