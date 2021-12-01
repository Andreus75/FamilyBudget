const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const { User, Transaction } = require('../dataBase');
const { emailService } = require('../services');
const {REPORT} = require('../configs/email-action-enum');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'month');
    let total = 0;
    const users = await User.find();
    const transactions = await Transaction.find({createAt: {$jt: previousMonth}});
    const userAdmin = await User.findOne({role: 'admin'});
    for (const user of users) {
        for (const transaction of transactions) {
            if (user._id === transaction.user_id) {
                total = total + transaction.sum;
                await emailService.sendMail(
                    userAdmin.email,
                    REPORT,
                    {adminName: userAdmin.full_name, userName: user.full_name, total});
            }
        }
    }
};

