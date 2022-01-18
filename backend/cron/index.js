const cron = require('node-cron');

const report = require('./report');
const deleteOldToken = require('./old_token_delete');

module.exports = () => {
    cron.schedule('0 0 1 * *', async () => {
        console.log('Cron start at', new Date().toISOString());
        await report();
        console.log('Cron stop at', new Date().toISOString());
    });

    cron.schedule('0 0 1 * *',async () => {
        console.log('Cron start at', new Date().toISOString());
        await deleteOldToken();
        console.log('Cron stop at', new Date().toISOString());
    });
};

