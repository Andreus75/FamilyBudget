const jwt = require('jsonwebtoken');
const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, JWT_ACTION_FORGOT_SECRET, JWT_ACTION_TOKEN} = require('../configs/config');
const ErrorHandler = require('../errors/ErrorHandler');
const { INVALID_TOKEN, ClientErrorUnauthorized, ServerErrorInternal} = require('../configs/error-enum');
const { tokenTypeEnum } = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_TOKEN, { expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret = '';

            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_TOKEN;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_TOKEN;
                    break;
                case tokenTypeEnum.ACTION :
                    secret = JWT_ACTION_TOKEN;
                    break;
                case tokenTypeEnum.FORGOT_PASSWORD:
                    secret = JWT_ACTION_FORGOT_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);

        }
    },

    createActionToken: () => {
        const activate_token = jwt.sign({}, JWT_ACTION_TOKEN, {expiresIn: '24h'});

        return activate_token;
    },

    generateForgotActionToken: (actionTokenType) => {
        try {
            let secretWord;

            switch (actionTokenType) {
                case tokenTypeEnum.FORGOT_PASSWORD:
                    secretWord =JWT_ACTION_FORGOT_SECRET;
                    break;
                default:
                    throw new ErrorHandler(INVALID_TOKEN, ServerErrorInternal);
            }

            const generate_forgot_token = jwt.sign({}, secretWord, {expiresIn: '24h'});

            return generate_forgot_token;
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
        }
    }
};
