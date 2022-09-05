const express = require("express");
const router = express.Router();

const {authRouter} = require("./authRouter");
const pinRouter = require('./pinRouter');
const boardRouter = require('./boardRouter');

router.use("/auth", authRouter);
router.use('/pins', pinRouter.router)
router.use('/board', boardRouter.router);

module.exports = router;

