const { jwtService } = require('../services');
const { User, Auth } = require('../dataBase');
const { AUTHORIZATION } = require('../configs/constants');

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
    }
};
