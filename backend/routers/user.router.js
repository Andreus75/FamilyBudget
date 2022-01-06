const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middlewares');
const userValidator = require('../validators/user.validator');
const { userController } = require('../controllers');

router.use(authMiddleware.chekAccessToken);

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.userCreateValidator),
    userMiddleware.isUserAdminExist,
    userController.createUser);

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
