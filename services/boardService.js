const boardDao = require('../models/boardDao');
const authDao = require('../models/authDao');
const ErrorCreater = require('../middlewares/errorCreater');

const createBoard = async (userId, title) => {
    if(!userId || !title) {
        throw new ErrorCreater('KEY_ERROR', 400)
    }

    return await boardDao.createBoard(userId, title);
}

module.exports = {
    createBoard
}