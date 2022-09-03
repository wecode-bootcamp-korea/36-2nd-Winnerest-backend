const pinService = require('../services/pinService');
const ErrorCreater = require("../middlewares/errorCreater");

const createPin = async (req, res) => {
    
    const boardId = req.body.boardId
    const title = req.body.title
    const contents = req.body.contents
    const tagId = req.body.tagId
    const imgUrl = req.body.imgUrl
    
    if(!boardId ||!title ||!tagId || !imgUrl){
        throw new ErrorCreater("KEY_ERROR", 400)}
    
    await pinService.createPin(boardId, title, contents, tagId, imgUrl)
    res.status(201).json({message: "POST_CREATE"})
        }

const deletePin = async (req, res) => {
    const pinId = req.params.id
    const userId = 1
    if(!pinId){
        throw new ErrorCreater("KEY_ERROR", 400)
    }
    await pinService.deletePin(pinId, userId)
    res.status(200).json({message: "DELETE_PIN_SUCCESS"})
}
module.exports = {createPin, deletePin}