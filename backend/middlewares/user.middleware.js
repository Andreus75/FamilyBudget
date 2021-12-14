const {Error} = require('mongoose');

const {
    ClientErrorBadRequest,
    USERNAME_ALREADY_EXIST,
    ClientErrorNotFound,
    USER_WITH_THIS_ID_IS_MISSING
} = require('../configs/error-enum');
const { User } = require('../dataBase');

module.exports = {
    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const { error, value } = validator.validate(req.body);
            if (error) {
                return next({
                    message:  new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNameExist: async (req, res, next) => {
        try {
            const { user_name } = req.body;

            const user = await User.findOne({ user_name });

            if (user) {
                return next({
                    message: USERNAME_ALREADY_EXIST,
                    status: ClientErrorNotFound
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findOne({_id: user_id});

            if (!user) {
                return next({
                    message: USER_WITH_THIS_ID_IS_MISSING,
                    status: ClientErrorNotFound
                });
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
