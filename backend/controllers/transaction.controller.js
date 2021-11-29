const { Transaction, User} = require('../dataBase');
const { SuccessCreated, YOU_HAVE_NOT_RIGHTS, SuccessNoContent} = require('../configs/error-enum');
const { emailService } = require('../services');
const { emailActionEnum } = require('../configs');

module.exports = {
    createTransaction: async (req, res, next) => {
        try {
            const user = req.user;

            const newTransaction = await Transaction.create({...req.body, full_name_user: user.full_name, user_id: user._id });

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

    findAllTransaction: async (req, res, next) => {
        try {
            const transactions = await Transaction.find();

            res.json(transactions);
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
                { admin: userAdmin.full_name, userName: user.full_name, transaction: transaction.toString() }
            );

            res.json('transaction was deleted');
        } catch (e) {
            next(e);
        }
    },

    filterTransaction: (req, res, next) => {
        try {
            const transactions = req.transactions;
            console.log(transactions);
            res.json(transactions);
        } catch (e) {
            next(e);
        }
    }
};
