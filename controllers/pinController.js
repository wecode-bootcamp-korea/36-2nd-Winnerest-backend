const pinService = require('../services/pinService');

const findMainPins = async(req, res) => {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.page);
    const userId = req.user.id;
    const pinInfos = await pinService.getMainPins(userId, pageSize, page);
    return res.status(200).json({data : pinInfos});
}

const findRecommendPins = async(req, res) => {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.page);
    const { tagId } = req.params;
    const recommendPinInfos = await pinService.getRecommendPins(tagId, pageSize, page);
    return res.status(200).json({data : recommendPinInfos});
}

const getPinInfo = async(req, res) => {
    const {pinId} = req.params;
    const pinInfo = await pinService.getPinInfo(pinId);
    res.status(200).json(pinInfo);
}

module.exports = {
    findMainPins,
    findRecommendPins,
    getPinInfo
}
