const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {Auth} = require('../dataBase');

dayJs.extend(utc);

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'month');

    const deleteInfo = await Auth.deleteMany({
        createAt: { $lt: previousMonth }
    });

    console.log(deleteInfo);
};
