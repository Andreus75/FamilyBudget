const Joi = require('joi');

const { transactionCategoryEnum, transactionKindEnum } = require('../configs');

const createTransactionValidator = Joi.object({
    sum: Joi.number()
        .integer()
        .required(),
    category: Joi.string()
        .allow(...Object.values(transactionCategoryEnum))
        .required(),
    kind: Joi.string().allow(...Object.values(transactionKindEnum))
});
const updateTransactionValidator = Joi.object({
    sum: Joi.number()
        .integer(),
    category: Joi.string()
        .allow(...Object.values(transactionCategoryEnum)),
    kind: Joi.string().allow(...Object.values(transactionKindEnum))
});
const filterTransactionValidator = Joi.object({
    start_data: Joi.string(),
    end_data: Joi.string(),
    full_name_user: Joi.string()
});

module.exports = {
    createTransactionValidator,
    updateTransactionValidator,
    filterTransactionValidator
};
