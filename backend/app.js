const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connect successfully');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter, transactionRouter } = require('./routers');

app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

