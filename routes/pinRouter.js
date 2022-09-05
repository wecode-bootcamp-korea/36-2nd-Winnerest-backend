const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const pinController = require('../controllers/pinController');
const auth = require('../middlewares/auth');
const upload = require('../modules/upload')
const pinRouter = express.Router();

pinRouter.get('/', errorHandler(auth.validationToken), errorHandler(pinController.findMainPins));
pinRouter.get('/recommend/:tagId', errorHandler(auth.validationToken), errorHandler(pinController.findRecommendPins));
pinRouter.get('/:pinId', pinController.getPinInfo);
pinRouter.delete('/:pinId', errorHandler(auth.validationToken), pinController.deletePin);
pinRouter.patch('/:pinId',errorHandler(auth.validationToken), pinController.patchPin)
pinRouter.post("/", errorHandler(auth.validationToken), upload.single('imgUrl'), errorHandler(pinController.createPin));

module.exports = { pinRouter };