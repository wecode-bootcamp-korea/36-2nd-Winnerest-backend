const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');

const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(router)
    app.use(globalErrorHandler = (err, req, res, next) => {
        res.status(err.statusCode ? err.statusCode : 500).json({ message: err.message });
    })
    return app;
};
module.exports = { createApp };