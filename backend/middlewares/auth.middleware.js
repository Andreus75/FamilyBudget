const { User } = require('../dataBase');
const { USERNAME_OR_PASSWORD_IS_WRONG, ClientErrorNotFound } = require('../configs/error-enum');
const { passwordService } = require('../services');
module.exports = {
    authUserToUserName: async (req, res, next) => {
        try {
            const { user_name } = req.body;

            const user = await User.findOne(
                {user_name})
                .select('+password')
                .lean();

            if (!user) {
                return next({
                    message: USERNAME_OR_PASSWORD_IS_WRONG,
                    status: ClientErrorNotFound
                });
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    authUserToPassword: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    }
};
