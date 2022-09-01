const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const pinController = require('../controllers/pinController');
const auth = require('../middlewares/auth');
const pinRouter = express.Router();

pinRouter.get('/', errorHandler(auth.validationToken), errorHandler(pinController.findMainPins));

module.exports = {
    pinRouter
}