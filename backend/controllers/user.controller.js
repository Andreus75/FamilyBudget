const { User } = require('../dataBase');
const {SuccessCreated} = require('../configs/error-enum');
const userUtil = require('../util/user.util');

module.exports = {
    createUser: (req, res, next) => {
        try {
            const newUser = User.create(req.body);

            const newUserNormalise = userUtil.userNormalization(newUser);

            res.status(SuccessCreated).json(newUserNormalise);
        } catch (e) {
            next(e);
        }
    },

    getUsers: (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    }
};
