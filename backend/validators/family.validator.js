const Joi = require('joi');
const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constants');

const familyCreateValidator = Joi.object({
    family_name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .trim()
        .required(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required(),
    avatar: Joi.string()
});

const familyNameAndPasswordValidator = Joi.object({
    email: Joi.string()
        .required()
        .regex(EMAIL_REGEXP),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .trim()
});

module.exports = { familyCreateValidator, familyNameAndPasswordValidator };

