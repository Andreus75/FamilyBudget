const { jwtService, emailService, passwordService} = require('../services');
const { User, Auth, ActionForgot, Family} = require('../dataBase');
const { AUTHORIZATION } = require('../configs/constants');
const { USER_NOT_FOUND, ClientErrorNotFound, SuccessOK, FAMILY_IS_ACTIVE} = require('../configs/error-enum');
const { tokenTypeEnum, emailActionEnum, config : { HTTP } } = require('../configs');

module.exports = {
    family_login: async (req, res, next) => {
        try {
            console.log('family_login');
            const family = req.family;

            const tokenPair = jwtService.generateTokenPair();

            await Family.updateOne(family, {is_login: true}, { new: true});

            await Auth.create({...tokenPair, family_id: family._id});

            res.json({family, ...tokenPair});
        } catch (e) {
            next(e);
        }
},

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const authToken = await Auth.findOne({access_token: token});

            await Family.findOneAndUpdate({ _id: authToken.user_id }, { is_login: false }, { new: true });

            await Auth.deleteOne(authToken);

            res.json('logout');
        } catch (e) {
            next(e);
        }
    },

    activate: async (req, res, next) => {
        try {
            const { _id, family_name } = req.family;

            await Family.updateOne({ _id }, { is_active: true });

            res.status(SuccessOK).json(family_name + ' ' + FAMILY_IS_ACTIVE);
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
                {forgotPasswordUrl: HTTP + `auth/password/forgot/new?token=${actionForgotToken}`}
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
