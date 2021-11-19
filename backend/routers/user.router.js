const router = require('express').Router();

const { userMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.userCreateValidator),
    userMiddleware.isUserNameExist
);

module.exports = router;
