const { ClientErrorBadRequest, TRANSACTION_WITH_THIS_ID_IS_MISSING, ClientErrorNotFound} = require('../configs/error-enum');
const { Transaction } = require('../dataBase');

module.exports = {
    isTransactionBodyValid: (validator) => (req, res, next) => {
        try {
            const { error, value } = validator.validate(req.body);

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    findTransactionById: async (req, res, next) => {
        try {
            const { transaction_id } = req.params;

            const transactionById = await Transaction.findById({_id: transaction_id});

            if (!transactionById) {
                return next({
                    message: TRANSACTION_WITH_THIS_ID_IS_MISSING,
                    status: ClientErrorNotFound
                });
            }

            req.transaction = transactionById;

            next();
        } catch (e) {
            next(e);
        }
    },

    findTransactionFilter: async (req, res, next) => {
        try {
            const {start_data, end_data, full_name_user} = req.query;

            const transactions = [];

            if (start_data && end_data && full_name_user) {
                const transactionsFilter1 = await Transaction
                    .find({createdAt: {$gte: start_data, $lte: end_data}});

                for (const transactionsFilterElement of transactionsFilter1) {

                    if (full_name_user === transactionsFilterElement.full_name_user) {
                        transactions.push(transactionsFilterElement);
                    }

                    req.transactions = transactions;
                }
            }else if (start_data && end_data && !full_name_user) {

                req.transactions = await Transaction
                    .find({createdAt: {$gte: start_data, $lte: end_data}});
            }else if (!start_data && !end_data && full_name_user) {

                req.transactions = await Transaction.find({full_name_user});
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
