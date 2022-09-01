const express = require("express");
const router = express.Router();

const {authRouter} = require("./authRouter");
const {pinRouter} = require('./pinRouter');

router.use("/auth", authRouter);
router.use('/pins', pinRouter);

module.exports = router;

