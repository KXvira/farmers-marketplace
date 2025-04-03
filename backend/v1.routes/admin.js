const express = require('express');
const userController = require('../v1.controllers/userController');
const orderController = require('../v1.controllers/orderController');
const productController = require('../v1.controllers/productController');
const { verifyToken, requireRole } = require('../v1.middlewares/autheticate');

const router = express.Router();

router.post('/login', userController.adminLogin);

router.get('/fetchusers', verifyToken, requireRole(["admin"]), userController.allUsers);
router.get('/usercount', verifyToken, requireRole(["admin"]), userController.userCount);
router.delete('/deleteuser/:userId', verifyToken, requireRole(["admin"]), userController.deleteUser);
router.get('/getproducts', verifyToken, requireRole(["admin"]), productController.getAllProductsAdmin);
router.get('/ordercount', verifyToken, requireRole(["admin"]), orderController.orderCount);
router.get('/productcount', verifyToken, requireRole(["admin"]), productController.productCount);
router.get('/completedorders', verifyToken, requireRole(["admin"]), orderController.viewCompletedOrders);
router.post('/approveproduct/:productId', verifyToken, requireRole(["admin"]), productController.approveProduct);

router.post('/updateorderstatus', verifyToken, requireRole(["admin"]), orderController.placeOrder);

module.exports = router;