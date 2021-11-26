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

router.post(
    '/password/forgot',
    userMiddleware.isUserBodyValid(userValidator.emailValidator),
    authController.sendMailForgotPassword
);

router.put(
    '/password/forgot',
    userMiddleware.isUserBodyValid(userValidator.passwordValidator),
    authMiddleware.chekAccessNewToken,
    authController.setNewPasswordAfterForgot
);

module.exports = router;
