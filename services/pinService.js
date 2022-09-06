const pinDao = require('../models/pinDao');

const getMainPins = async(userId, pageSize, page) => {
    return await pinDao.getMainPinInfos(userId, pageSize, page);
}

const getPinInfo = async (pinId) => {
    return await pinDao.getPinInfo(pinId);
}

module.exports = {
    getMainPins,
    getPinInfo
}