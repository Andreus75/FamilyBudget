const { User } = require('../dataBase');
const { SuccessCreated, SuccessNoContent } = require('../configs/error-enum');
const userUtil = require('../util/user.util');
const { passwordService } = require('../services');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { _id } = req.family;
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({ ...req.body, family_id: _id, password: hashedPassword});

            const newUserNormalise = userUtil.userNormalization(newUser);

            res.json(newUserNormalise);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const family = req.family;

            const users = await User.find({family_id: family._id});

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
            const { user_id } = req.params;

            await User.findOneAndDelete({_id: user_id});

            res.sendStatus(SuccessNoContent);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const { name, status, email } = req.body;

            const userUpdate = await User.findByIdAndUpdate({_id: user_id}, { name, status, email }, { new: true });

            res.status(SuccessCreated).json(userUpdate);
        } catch (e) {
            next(e);
        }
    }
};
