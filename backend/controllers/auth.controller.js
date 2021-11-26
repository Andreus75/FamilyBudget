const { jwtService, emailService, passwordService} = require('../services');
const { User, Auth, ActionForgot } = require('../dataBase');
const { AUTHORIZATION } = require('../configs/constants');
const { USER_NOT_FOUND, ClientErrorNotFound } = require('../configs/error-enum');
const { tokenTypeEnum, emailActionEnum, config : { HTTP } } = require('../configs');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await User.updateOne(user, {is_login: true}, {new: true});

            await Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const authToken = await Auth.findOne({access_token: token});

            await User.findOneAndUpdate({ _id: authToken.user_id }, { is_login: false }, { new: true });

            await Auth.deleteOne(authToken);

            res.json('logout');
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return next({
                    message: USER_NOT_FOUND,
                    status: ClientErrorNotFound
                });
            }

            const actionForgotToken = jwtService.generateForgotActionToken(tokenTypeEnum.FORGOT_PASSWORD);

            await ActionForgot.create({
                token_forgot: actionForgotToken,
                token_type: tokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: HTTP + `passwordForgot?token=${actionForgotToken}`}
            );

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },
    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const { user, user: { _id, email, fullName } } = req;

            const { password } = req.body;

            const hashNewPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate(_id, { password: hashNewPassword }, {new: true});

            await ActionForgot.deleteOne({token});

            await Auth.deleteMany({user_id: user._id});

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT_PASSWORD,
                { userName: fullName }
            );

            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
