const { User, ActionForgot} = require('../dataBase');
const {
    USERNAME_OR_PASSWORD_IS_WRONG,
    ClientErrorNotFound,
    INVALID_TOKEN,
    ClientErrorUnauthorized
} = require('../configs/error-enum');
const { passwordService, jwtService} = require('../services');
const { AUTHORIZATION } = require('../configs/constants');
const { tokenTypeEnum } = require('../configs');

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
    },

    chekAccessNewToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token, tokenTypeEnum.FORGOT_PASSWORD);

            const tokenForgotNew = await ActionForgot
                .findOne({token, type: tokenTypeEnum.FORGOT_PASSWORD})
                .populate('user_id');

            if (!tokenForgotNew) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            req.user = tokenForgotNew.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
