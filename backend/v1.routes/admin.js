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
router.get('/getproducts', verifyToken, requireRole(["admin"]), productController.getAllProducts);
router.get('/ordercount', verifyToken, requireRole(["admin"]), orderController.orderCount);

router.post('/updateorderstatus', verifyToken, requireRole(["admin"]), orderController.placeOrder);

module.exports = router;