const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');
const { userController } = require('../controllers');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.userCreateValidator),
    userMiddleware.isUserNameExist,
    userController.createUser);

router.use(authMiddleware.chekAccessToken);

router.get('/', userController.getUsers);

router.get('/:user_id', userMiddleware.isUserExist, userController.getUserById);

router.delete('/:user_id', userController.deleteUserById);

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(userValidator.userUpdateValidator),
    userMiddleware.isUserExist,
    userController.updateUser
);

module.exports = router;
