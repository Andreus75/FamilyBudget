const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');
const { authController } = require('../controllers');

router.get('/activate/:token', authMiddleware.checkActivateToken, authController.activate);

router.post(
    '/family',
    authMiddleware.authToEmail,
    authMiddleware.authToUser,
    authMiddleware.authFamilyToPassword,
    authMiddleware.authUserPassword,
    authController.family_login
);

router.post(
    '/logout',
    authController.logout
);

router.post('/change/password');

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
