const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

require('dotenv').config();

const { PORT, HOST, MONGO_CONNECT_URL } = require('./configs/config');
const startCron = require('./cron');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connect successfully');
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter, transactionRouter, familyRouter } = require('./routers');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/family', familyRouter);
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter);

app.listen(PORT, HOST,() => {
    console.log(`App listen ${PORT}`);
    startCron();
});

