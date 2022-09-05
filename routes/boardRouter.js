const express = require('express');
const boardRouter = express.Router();

const errorHandler = require('../middlewares/errorHandler')
const auth = require('../middlewares/auth');
const boardController = require('../controllers/boardController');

boardRouter.post('/', errorHandler(auth.validationToken), errorHandler(boardController.createBoard));

module.exports = {
    boardRouter
}