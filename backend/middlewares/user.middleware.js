const {Error} = require('mongoose');

const { ClientErrorBadRequest, USERNAME_ALREADY_EXIST, ClientErrorNotFound} = require('../configs/error-enum');
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

    isUserNameExist: (req, res, next) => {
        try {
            const { userName } = req.body;

            const user = User.findOne({ userName });

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
    }
};
