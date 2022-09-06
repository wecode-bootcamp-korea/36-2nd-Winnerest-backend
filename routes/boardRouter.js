const express = require('express');
const boardRouter = express.Router();

const errorHandler = require('../middlewares/errorHandler')
const auth = require('../middlewares/auth');
const boardController = require('../controllers/boardController');

boardRouter.get('/title', errorHandler(auth.validationToken), errorHandler(boardController.getBoardTitle));
boardRouter.get('/userId/:userId', errorHandler(auth.validationToken), errorHandler(boardController.getUserBoard));
boardRouter.get('/:boardId', errorHandler(auth.validationToken), errorHandler(boardController.getBoardInfo));
boardRouter.post('/', errorHandler(auth.validationToken), errorHandler(boardController.createBoard));
boardRouter.patch('/:boardId', errorHandler(auth.validationToken), errorHandler(boardController.updateBoard));
boardRouter.delete('/:boardId', errorHandler(auth.validationToken), errorHandler(boardController.deleteBoard));

module.exports = {
    boardRouter
}