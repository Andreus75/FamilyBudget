const router = require('express').Router();

const { userMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');
const userController = require('../controllers/user.controller');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.userCreateValidator),
    userMiddleware.isUserNameExist,
    userController.createUser);

router.get('/', userController.getUsers);

router.get('/user_id', userMiddleware.isUserExist, userController.getUserById);

router.delete('/user_id', userMiddleware.isUserExist);

module.exports = router;
