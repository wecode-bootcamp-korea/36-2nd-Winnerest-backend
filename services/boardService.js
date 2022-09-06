const boardDao = require('../models/boardDao');
const ErrorCreater = require('../middlewares/errorCreater');

const createBoard = async (userId, title) => {
    if(!title) {
        throw new ErrorCreater('KEY_ERROR', 400);
    }

    return await boardDao.createBoard(userId, title);
}

const getBoardTitle = async (userId) => {
    return await boardDao.getBoardTitle(userId);
}

const getUserBoard = async (userId, boardId) => {
    const boardDatas = await boardDao.getUserBoard(userId, boardId);
    for (const boardData of boardDatas) {
        boardData.pinDatas = JSON.parse(boardData.pinDatas)
    }
    return boardDatas;
}

const getBoardInfo = async (boardId) => {
    return await boardDao.getBoardInfo(boardId);
}

const updateBoard = async (userId, title, boardId) => {
    if(!title) {
        throw new ErrorCreater('KEY_ERROR', 400);
    }
    
    const {verifiedResult} = await boardDao.verifiedUserBoard(userId, boardId);
    if(Number(verifiedResult) === 0) {
        throw new ErrorCreater('INVAILED_USER', 400);
    }

    return await boardDao.updateBoard(userId, title, boardId);
}

const deleteBoard = async (userId, boardId) => {
    const {verifiedResult} = await boardDao.verifiedUserBoard(userId, boardId);
    if(Number(verifiedResult) === 0) {
        throw new ErrorCreater('INVAILED_USER', 400);
    }

    return await boardDao.deleteBoard(userId,boardId);
}

module.exports = {
    createBoard,
    getBoardTitle,
    getUserBoard,
    getBoardInfo,
    updateBoard,
    deleteBoard,
}