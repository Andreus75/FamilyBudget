const bcrypt = require('bcrypt');
const { USERNAME_OR_PASSWORD_IS_WRONG, ClientErrorNotFound } = require('../configs/error-enum');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(USERNAME_OR_PASSWORD_IS_WRONG, ClientErrorNotFound);
        }
    }
};

