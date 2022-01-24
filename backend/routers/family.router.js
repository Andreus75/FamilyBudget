const router = require('express').Router();

const { familyMiddleware, fileMiddleware, authMiddleware} = require('../middlewares');
const { familyValidator } = require('../validators');
const { familyController } = require('../controllers');

router.post(
    '/',
    familyMiddleware.isBodyFamilyValid(familyValidator.familyCreateValidator),
    fileMiddleware.checkFamilyAvatar,
    familyMiddleware.isFamilyEmailExist,
    familyController.createFamily
);

router.use(authMiddleware.chekAccessToken);

router.get('/', familyController.getFamily);

router.use(authMiddleware.chekAccessTokenWithUser);

router.delete('/', familyController.deleteFamilyById);

module.exports = router;
