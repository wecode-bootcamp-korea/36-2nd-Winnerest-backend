const express = require('express');
const router = express.Router();

const errorHandler = require('../middlewares/errorHandler')
const auth = require('../middlewares/auth');
const boardController = require('../controllers/boardController');

router.post('/', errorHandler(auth.validationToken), errorHandler(boardController.createBoard));

module.exports = {
    router
}