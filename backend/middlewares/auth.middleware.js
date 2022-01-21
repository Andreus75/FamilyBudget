const { User, ActionForgot, Auth, Family, Action} = require('../dataBase');
const {
    USERNAME_OR_PASSWORD_IS_WRONG,
    ClientErrorNotFound,
    INVALID_TOKEN,
    ClientErrorUnauthorized,
    FAMILY_EMAIL_OR_PASSWORD_IS_WRONG,
    ACTIVATE_FAMILY, YOU_MUST_REGISTER_AS_USER
} = require('../configs/error-enum');
const { passwordService, jwtService} = require('../services');
const { AUTHORIZATION } = require('../configs/constants');
const { tokenTypeEnum } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    authToUser: async (req, res, next) => {
        try {
            const family = req.family;
            const { user_name } = req.body;

            if (user_name) {

                const user = await User
                    .findOne({ family_id: family._id, name: user_name})
                    .select('+password')
                    .lean();

                if (!user) {
                    return next({
                        message: USERNAME_OR_PASSWORD_IS_WRONG,
                        status: ClientErrorNotFound
                    });
                }

                req.user = user;
            } else {
                req.user = {};
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    authToEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const family = await Family.findOne(
                {email})
                .select('+password')
                .lean();

            if (!family) {
                return next({
                    message: FAMILY_EMAIL_OR_PASSWORD_IS_WRONG,
                    status: ClientErrorNotFound
                });
                if (!family.is_active) {
                    return res.statusCode(ClientErrorNotFound).json({ message: ACTIVATE_FAMILY });
                }
            }

            req.family = family;

            next();
        } catch (e) {
            next(e);
        }
    },

    authFamilyToPassword: async (req, res, next) => {
        try {
            const { family_password } = req.body;
            const { password: hashPassword } = req.family;

            await passwordService.compare(family_password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    authUserPassword: async (req, res, next) => {
        try {
            const { user_password } = req.body;

            if (user_password) {
                const { password: hashPassword } = req.user;

                await passwordService.compare(user_password, hashPassword);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActivateToken: async (req, res, next) => {
        try {
            const { token } = req.params;

            await jwtService.verifyToken(token, tokenTypeEnum.ACTION);

            const { family_id: family, _id} = await Action.findOne({token, type: tokenTypeEnum.ACTION}).populate('family_id');

            if (!family) {
                throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
            }

            req.family = family;

            await Action.deleteOne({ _id });

            next();
        } catch (e) {
            next(e);
        }
    },

    chekAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token);

            const registrationFamily = await Auth.findOne({access_token: token}).populate('family_id');

            if (!registrationFamily) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            req.family = registrationFamily.family_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    chekAccessTokenWithUser: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token);

            const registrationFamilyUser = await Auth.findOne({access_token: token}).populate('user_id');

            if (!registrationFamilyUser.user_id) {
                return next({
                    message: YOU_MUST_REGISTER_AS_USER,
                    status: ClientErrorUnauthorized
                });
            } 
            req.user = registrationFamilyUser.user_id;

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
