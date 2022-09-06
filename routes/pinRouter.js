const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const pinController = require('../controllers/pinController');
const auth = require('../middlewares/auth');
const pinRouter = express.Router();

pinRouter.get('/', errorHandler(auth.validationToken), errorHandler(pinController.findMainPins));
pinRouter.get('/recommend/:tagId', errorHandler(auth.validationToken), errorHandler(pinController.findRecommendPins));
pinRouter.get('/:pinId', pinController.getPinInfo);

module.exports = {
    pinRouter
}