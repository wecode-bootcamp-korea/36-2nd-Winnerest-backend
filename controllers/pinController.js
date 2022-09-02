const pinService = require('../services/pinService');
const error = require("../middlewares/errorCreater");

const createPin = async (req, res) => {
    
    const pinInfo = req.body;
    const boardId = pinInfo.boardId
    const title = pinInfo.title
    const contents = pinInfo.contents
    const tagId = pinInfo.tagId
    const imgUrl = pinInfo.imgUrl
    

    if(!boardId ||!title ||!contents || !tagId || !imgUrl){
        throw new error("KEY_ERROR", 400)}
    
        await pinService.createPin(boardId, title, contents, tagId, imgUrl)
        
        res.status(200).json({message: "POST_CREATE"})
        }

module.exports = {createPin}