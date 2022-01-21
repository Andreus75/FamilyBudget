const router = require('express').Router();

const { transactionMiddleware, authMiddleware} = require('../middlewares');
const { transactionValidator } = require('../validators');
const { transactionController } = require('../controllers');

router.use(authMiddleware.chekAccessToken);

router.get('/', transactionController.findAllFamilyTransaction);

router.get(
    '/filters',
    transactionMiddleware.findTransactionFilter,
    transactionController.filterTransaction
);

router.use(authMiddleware.chekAccessTokenWithUser);

router.post(
    '/',
    transactionMiddleware.isTransactionBodyValid(transactionValidator.createTransactionValidator),
    transactionController.createTransaction
);

router.get('/:transaction_id', transactionMiddleware.findTransactionById, transactionController.findTransactionById);

router.put(
    '/:transaction_id',
    transactionMiddleware.isTransactionBodyValid(transactionValidator.updateTransactionValidator),
    transactionMiddleware.findTransactionById,
    transactionController.updateTransaction
);

router.delete(
    '/:transaction_id',
    transactionMiddleware.findTransactionById,
    transactionController.deleteTransaction
);

module.exports = router;
