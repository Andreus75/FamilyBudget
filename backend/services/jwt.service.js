const jwt = require('jsonwebtoken');
const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = require('../configs/config');
const ErrorHandler = require('../errors/ErrorHandler');
const { INVALID_TOKEN, ClientErrorUnauthorized } = require('../configs/error-enum');
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

    verifyToken: async (token, tokenType = tokenTypeEnum) => {
        try {
            let secret = '';

            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_TOKEN;
                    break;
                case tokenType.REFRESH:
                    secret = JWT_REFRESH_TOKEN;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);

        }
    }
};
