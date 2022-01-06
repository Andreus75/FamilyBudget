const { Transaction, User} = require('../dataBase');
const { SuccessCreated, YOU_HAVE_NOT_RIGHTS, SuccessNoContent} = require('../configs/error-enum');
const { emailService } = require('../services');
const { emailActionEnum } = require('../configs');

module.exports = {
    createTransaction: async (req, res, next) => {
        try {
            const family = req.family;

            const { sum, user_name } = req.body;

            const user = await User.findOne({family_id: family._id, name: user_name});

            user.total = user.total + sum;

            await User.findByIdAndUpdate({_id: user.id}, {total: user.total}, {new: true});

            const newTransaction = await Transaction.create({
                ...req.body,
                user_name: user.name,
                user_id: user._id,
                family_id: family._id });

            res.json(newTransaction);
        }catch (e) {
            next(e);
        }
    },

    updateTransaction: async (req, res, next) => {
        try {
            const { _id } = req.transaction;
            const { data, sum, category, kind } = req.body;

            const updateTransaction = await Transaction.findByIdAndUpdate({_id}, { data, sum, category, kind }, {new: true});

            res.status(SuccessCreated).json(updateTransaction);
        } catch (e) {
            next(e);
        }
    },

    findAllFamilyTransaction: async (req, res, next) => {
        try {
            let total = 0;
            const { _id } = req.family;
            const family_id = _id;
            const transactions = await Transaction.find({ family_id });
            for (const transaction of transactions) {
                total = total + transaction.sum;
            }
            res.json({transactions, total});
        } catch (e) {
            next(e);
        }
    },

    findTransactionById: (req, res, next) => {
        try {
            const transaction = req.transaction;

            res.json(transaction);
        } catch (e) {
            next(e);
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            const user = req.user;
            const { user_id } = req.transaction;
            const transaction = req.transaction;
            if (!user_id.equals(user._id)) {
                return next({
                    message: YOU_HAVE_NOT_RIGHTS,
                    status: SuccessNoContent
                });
            }

            await Transaction.deleteOne(transaction);

            const userAdmin = await User.findOne({role: 'admin'});

            await emailService.sendMail(
                userAdmin.email,
                emailActionEnum.DELETE_TRANSACTION,
                { admin: userAdmin.name, userName: user.name, transaction: transaction.toString() }
            );

            res.json('transaction was deleted');
        } catch (e) {
            next(e);
        }
    },

    filterTransaction: (req, res, next) => {
        try {
            let total = 0;
            const transactions = req.transactions;

            for (const transaction of transactions) {
                total = total + transaction.sum;
            }

            res.json({transactions, total});
        } catch (e) {
            next(e);
        }
    }
};
