const { User } = require('../dataBase');
const { SuccessCreated, SuccessNoContent } = require('../configs/error-enum');
const userUtil = require('../util/user.util');
const { passwordService } = require('../services');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const newUserNormalise = userUtil.userNormalization(newUser);

            res.status(SuccessCreated).json(newUserNormalise);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            const newUserNormalise = userUtil.userNormalization(user);

            res.json(newUserNormalise);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const user = req.user;

            await User.deleteOne(user);

            res.sendStatus(SuccessNoContent);
        } catch (e) {
            next(e);
        }
    }
};
