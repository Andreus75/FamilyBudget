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

            const transactionById = await Transaction.findById({ _id: transaction_id });

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

    // eslint-disable-next-line
    findTransactionFilter: async (req, res, next) => {
        try {
            const { _id } = req.family;
            const { start_data, end_data, user_name, category } = req.query;

            const family_id = _id;

            if (start_data && end_data && user_name && family_id && category) {

                req.transactions = await Transaction.find({
                    createdAt: {$gte: start_data, $lte: end_data},
                    user_name,
                    family_id,
                    category});
            }
            if (start_data && end_data && user_name && family_id && !category) {

                req.transactions = await Transaction
                    .find({createdAt: {$gte: start_data, $lte: end_data}, user_name, family_id});
            }
            if (start_data && end_data && family_id && !user_name && category) {

                req.transactions = await Transaction.find({createdAt: {$gte: start_data, $lte: end_data}, family_id, category});
            }
            if (!start_data && !end_data && user_name && family_id && category) {

                req.transactions = await Transaction.find({user_name, family_id, category});
            }
            if (start_data && end_data && !user_name && family_id && !category) {

                req.transactions = await Transaction
                    .find({createdAt: {$gte: start_data, $lte: end_data}, family_id});
            }
            if (!start_data && !end_data && family_id && user_name && !category) {

                req.transactions = await Transaction.find({family_id, user_name});
            }
            if (!start_data && !end_data && !user_name && family_id && category) {

                req.transactions = await Transaction.find({family_id, category});
            }
            if (!start_data && !end_data && !user_name && family_id && !category) {

                req.transactions = await Transaction.find({family_id});
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
