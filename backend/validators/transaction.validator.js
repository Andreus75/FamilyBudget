const Joi = require('joi');

const { transactionCategoryEnum, transactionKindEnum } = require('../configs');

const createTransactionValidator = Joi.object({
    data: Joi.string()
        .required(),
    sum: Joi.number()
        .integer()
        .required(),
    category: Joi.string()
        .allow(...Object.values(transactionCategoryEnum))
        .required(),
    kind: Joi.string().allow(...Object.values(transactionKindEnum))
});
const updateTransactionValidator = Joi.object({
    data: Joi.date(),
    sum: Joi.number()
        .integer(),
    category: Joi.string()
        .allow(...Object.values(transactionCategoryEnum)),
    kind: Joi.string().allow(...Object.values(transactionKindEnum))
});

module.exports = {
    createTransactionValidator,
    updateTransactionValidator
};
