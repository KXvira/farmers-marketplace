const express = require('express');
const upload = require('../v1.middlewares/upload')
const userController = require('../v1.controllers/userController')
const productController = require('../v1.controllers/productController')
const orderController = require('../v1.controllers/orderController')
const { verifyToken, requireRole } = require('../v1.middlewares/autheticate')

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/editprofile', verifyToken, requireRole(["farmer"]), userController.editProfile);
router.get('/viewprofile/:userId', verifyToken, requireRole(["farmer"]), userController.viewProfile);

router.post('/addproduct', upload.single("productImage"), verifyToken, requireRole(["farmer"]), productController.addProduct);
router.get('/myproducts/:farmerId', verifyToken, requireRole(["farmer"]), productController.listProducts);
router.post('/updateproduct/:id', upload.single("productImage") ,verifyToken, requireRole(["farmer"]), productController.updateProduct);
router.delete('/deleteproduct/:id', verifyToken, requireRole(["farmer"]), productController.deleteProduct);

router.get('/viewSales', verifyToken, requireRole(["farmer"]), orderController.viewSales);
router.get('/vieworders/:farmerId', verifyToken, requireRole(["farmer"]), orderController.viewOrders);
router.post('/confirmorders', verifyToken, requireRole(["farmer"]), orderController.confirmOrder);

module.exports = router;
