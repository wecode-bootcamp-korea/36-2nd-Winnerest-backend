const pinService = require('../services/pinService');

const findMainPins = async(req, res) => {
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 0;
    const page = req.query.page ? Number(req.query.page) : 0;
    const { user } = req;
    const userId = user.id
    const pinInfos = await pinService.getMainPins(userId, pageSize, page);
    return res.status(200).json({data : pinInfos});
}

module.exports = {
    findMainPins,
}
