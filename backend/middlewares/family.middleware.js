const {
    ClientErrorBadRequest,
    ClientErrorNotFound,
    FAMILY_ALREADY_EXIST,
    FAMILY_WITH_THIS_ID_IS_MISSING
} = require('../configs/error-enum');
const { Family } = require('../dataBase');

module.exports = {
    isBodyFamilyValid: (validator) => (req, res, next) => {
        try {
            const { error, value } = validator.validate(req.body);

            if (error) {
                return next({
                    message: new Error(error.default[0].message),
                    status: ClientErrorBadRequest
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isFamilyEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const family = await Family.findOne({ email });

            if (family) {
                return next({
                    message: FAMILY_ALREADY_EXIST,
                    status: ClientErrorNotFound
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isFamilyExist: async (req, res, next) => {
        try {
            const { family_id } = req.params;

            const family = await Family.findOne({ family_id });

            if (!family) {
                return next({
                    message: FAMILY_WITH_THIS_ID_IS_MISSING,
                    status: ClientErrorNotFound
                });
            }

            req.family = family;

            next();
        } catch (e) {
            next(e);
        }
    }


};
