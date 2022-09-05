const boardService = require('../services/boardService');

const createBoard = async (req, res) => {
    const { title } = req.body;
    const { user } = req;
    const userId = user.id;
    await boardService.createBoard(userId, title);
    return res.status(200).json({message : 'CREATED_BOARD'});
} 

module.exports = {
    createBoard,
}