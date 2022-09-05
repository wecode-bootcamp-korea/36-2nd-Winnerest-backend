const pinService = require('../services/pinService');
const ErrorCreater = require('../middlewares/errorCreater');

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

const deletePin = async (req, res) => {
    
    const {pinId} = req.params
    const userId = req.user.id
    
    if(!pinId){
        throw new ErrorCreater("KEY_ERROR", 400)
    }
    await pinService.deletePin(pinId, userId)
    res.status(200).json({message: "DELETE_SUCCESS"});
}

const patchPin = async(req, res) => {
    
    const {pinId} = req.params;
    const {boardId, title, contents} = req.body
    const userId = req.user.id
    
    if(!pinId || !boardId ||!title) {
        throw new ErrorCreater("KEY_ERROR", 400)
    }
    await pinService.patchPin(pinId, boardId, title, contents, userId);
    res.status(200).json({message: "PATCH_SUCCESS"});
} 

const createPin = async (req, res) => {

    const result = req.query
    const {boardId, title, contents, tagIds} = result;
    
    const imgUrl = req.file.location
    const userId = req.user.id
    
    if(!boardId ||!title ||!tagIds || !imgUrl){
        throw new ErrorCreater("KEY_ERROR", 400)}
    
    await pinService.createPin(boardId, title, contents, tagIds, imgUrl, userId)
    res.status(201).json({message: "POST_CREATE"})
        }

module.exports = {findMainPins, findRecommendPins, getPinInfo, createPin, deletePin, patchPin}