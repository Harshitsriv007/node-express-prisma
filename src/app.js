const express = require('express');
const userRouter = require('./routes/index.routes');
const logger = require('./middleware/logger.middleware');
const errorHandler = require('./middleware/error.middleware');

const app = express();
app.use(express.json());

// 1️⃣ Logging middleware FIRST
app.use(logger);

// 2️⃣ Routes
app.use("/api/v1", userRouter);

// 3️⃣ Error middleware LAST (MANDATORY)
app.use(errorHandler);

module.exports = app;