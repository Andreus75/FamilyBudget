const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constants');
const { userStatus, userRole } = require('../configs');


const userCreateValidator = Joi.object({
    user_name: Joi.string()
        .alphanum()
        .min(2)
        .max(15)
        .trim()
        .required(),
    full_name: Joi.string()
        .min(4)
        .max(30)
        .trim(),
    born: Joi.date()
        .required(),
    status: Joi.string().allow(...Object.values(userStatus)),
    role: Joi.string().allow(...Object.values(userRole)),
    email: Joi.string()
        .regex(EMAIL_REGEXP),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
});

const userNameAndPasswordValidator = Joi.object({
    user_name: Joi.string()
        .alphanum()
        .min(2)
        .max(15)
        .trim()
        .required(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
});

const userUpdateValidator = Joi.object({
    full_name: Joi.string()
        .min(4)
        .max(30)
        .trim(),
    status: Joi.string().allow(...Object.values(userStatus)),
    email: Joi.string()
        .regex(EMAIL_REGEXP),
});

const emailValidator = Joi.object({
    email: Joi.string()
        .regex(EMAIL_REGEXP)
});

const passwordValidator = Joi.object({
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
});

module.exports = {
    userCreateValidator,
    userNameAndPasswordValidator,
    userUpdateValidator,
    emailValidator,
    passwordValidator
};
