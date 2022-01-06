const {Error} = require('mongoose');

const {
    ClientErrorBadRequest,
    ClientErrorNotFound,
    USER_WITH_THIS_ID_IS_MISSING,
    USER_ADMIN_ALREADY_EXIST,
    ClientErrorConflict
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

    isUserAdminExist: async (req, res, next) => {
        try {
            const { _id } = req.family;
            const { role } = req.body;

            const user = await User.findOne({family_id: _id, role: 'admin'});

            if (user && role === 'admin') {
                return next({
                    message: USER_ADMIN_ALREADY_EXIST,
                    status: ClientErrorConflict
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
