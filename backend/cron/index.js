const cron = require('node-cron');

const report = require('./report');

module.exports = () => {
    cron.schedule('0 0 1 * *', async () => {
        console.log('Cron start at', new Date().toISOString());
        await report();
        console.log('Cron stop at', new Date().toISOString());
    });
};

