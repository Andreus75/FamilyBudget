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
            const { _id } = req.family;
            const { start_data, end_data, user_name } = req.query;

            const family_id = _id;
            const transactions = [];

            if (start_data && end_data && user_name && family_id) {
                const transactionsFilter1 = await Transaction
                    .find({createdAt: {$gte: start_data, $lte: end_data}, family_id});

                for (const transactionsFilterElement of transactionsFilter1) {

                    if (name === transactionsFilterElement.user_name) {
                        transactions.push(transactionsFilterElement);
                    }

                    req.transactions = transactions;
                }
            }else if (start_data && end_data && !user_name && family_id) {

                req.transactions = await Transaction
                    .find({createdAt: {$gte: start_data, $lte: end_data}});
            }else if (!start_data && !end_data && user_name && family_id) {

                req.transactions = await Transaction.find({user_name});
            }else if (!start_data && !end_data && !user_name && family_id) {
                req.transactions = await Transaction.find({family_id});
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
