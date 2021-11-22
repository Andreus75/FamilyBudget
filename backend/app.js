const express = require('express');
const mongoose = require('mongoose');

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connect successfully');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter } = require('./routers');

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

