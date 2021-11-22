const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');
const { authController } = require('../controllers');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.userNameAndPasswordValidator),
    authMiddleware.authUserToUserName,
    authMiddleware.authUserToPassword,
    authController.login
);

router.post('/logout', authController.logout);

module.exports = router;
