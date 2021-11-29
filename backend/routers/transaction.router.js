const router = require('express').Router();

const { transactionMiddleware, authMiddleware} = require('../middlewares');
const { transactionValidator } = require('../validators');
const { transactionController } = require('../controllers');

router.use(authMiddleware.chekAccessToken);

router.post(
    '/',
    transactionMiddleware.isTransactionBodyValid(transactionValidator.createTransactionValidator),
    transactionController.createTransaction
);

router.put(
    '/:transaction_id',
    transactionMiddleware.isTransactionBodyValid(transactionValidator.updateTransactionValidator),
    transactionController.updateTransaction
);

router.get('/', transactionController.findAllTransaction);

router.get(
    '/filter',
    transactionMiddleware.isTransactionBodyValid(transactionValidator.filterTransactionValidator),
    transactionMiddleware.findTransactionFilter,
    transactionController.filterTransaction);

router.get('/:transaction_id', transactionMiddleware.findTransactionById, transactionController.findTransactionById);

router.delete(
    '/:transaction_id',
    transactionMiddleware.findTransactionById,
    transactionController.deleteTransaction
);


module.exports = router;
