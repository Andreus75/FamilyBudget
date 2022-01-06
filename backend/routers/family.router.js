const router = require('express').Router();

const { familyMiddleware } = require('../middlewares');
const { familyValidator } = require('../validators');
const {familyController} = require('../controllers');

router.post(
    '/',
    familyMiddleware.isBodyFamilyValid(familyValidator.familyCreateValidator),
    familyMiddleware.isFamilyEmailExist,
    familyController.createFamily
);

router.get('/', familyController.getFamily);

router.get(
    ':family_id',
    familyMiddleware.isFamilyExist,
    familyController.getFamilyById
);

router.delete('/:family_id', familyController.deleteFamilyById);

module.exports = router;
