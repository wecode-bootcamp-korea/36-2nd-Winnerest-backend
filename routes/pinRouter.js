const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const pinController = require('../controllers/pinController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/main', errorHandler(auth.validationToken), errorHandler(pinController.findMainPins));

module.exports = {
    router
}