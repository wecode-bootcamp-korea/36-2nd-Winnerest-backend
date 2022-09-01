const pinDao = require('../models/pinDao');

const getMainPins = async(userId, pageSize, page) => {
    return await pinDao.getMainPinInfos(userId, pageSize, page);
}

module.exports = {
    getMainPins
}