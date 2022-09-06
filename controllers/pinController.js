const pinService = require('../services/pinService');

const findMainPins = async(req, res) => {
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 0;
    const page = req.query.page ? Number(req.query.page) : 0;
    const userId = req.user.id;
    const pinInfos = await pinService.getMainPins(userId, pageSize, page);
    return res.status(200).json({data : pinInfos});
}

const getPinInfo = async(req, res) => {
    const {pinId} = req.params;
    const pinInfo = await pinService.getPinInfo(pinId);
    res.status(200).json({data:pinInfo});
}

module.exports = {
    findMainPins,
    getPinInfo
}
