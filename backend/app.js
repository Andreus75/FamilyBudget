const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');
const startCron = require('./cron');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connect successfully');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter, transactionRouter } = require('./routers');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    startCron();
});

