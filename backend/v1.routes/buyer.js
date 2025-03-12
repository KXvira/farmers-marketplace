const express = require('express');
const userController = require('../v1.controllers/userController');
const productController = require('../v1.controllers/productController');
const orderController = require('../v1.controllers/orderController');
const transactionController = require('../v1.controllers/transactionController');
const { verifyToken, requireRole } = require('../v1.middlewares/autheticate');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/logout', userController.logout);

router.get('/searchproducts', verifyToken, requireRole(["buyer"]), productController.searchProducts);

router.post('/placeorder', verifyToken, requireRole(["buyer"]), orderController.placeOrder);
router.post('/cancelorder/:orderId', verifyToken, requireRole(["buyer"]), orderController.cancelOrder);

router.post('/processpayment', verifyToken, requireRole(["buyer"]), transactionController.processPayment);

module.exports = router;
