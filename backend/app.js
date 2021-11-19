const express = require('express');
const mongoose = require('mongoose');

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connect successfully');
});

const { userRouter } = require('./routers');

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

