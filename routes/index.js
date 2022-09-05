const express = require("express");
const router = express.Router();

const {authRouter} = require("./authRouter");
const {reviewRouter} = require("./reviewRouter");
const {pinRouter} = require('./pinRouter');
const {boardRouter} = require('./boardRouter');

router.use("/auth", authRouter);
router.use('/pins', pinRouter);
router.use('/board', boardRouter);
router.use("/reviews", reviewRouter);

module.exports = router;