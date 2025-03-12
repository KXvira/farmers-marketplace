const express = require('express');
const upload = require('../v1.middlewares/upload')
const userController = require('../v1.controllers/userController')
const productController = require('../v1.controllers/productController')
const orderController = require('../v1.controllers/orderController')
const { verifyToken, requireRole } = require('../v1.middlewares/autheticate')

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/addproduct', upload.single("productImage"), verifyToken, requireRole(["farmer"]), productController.addProduct);
router.get('/listproducts/:farmerId', verifyToken, requireRole(["farmer"]), productController.listProducts);
router.post('/updateproduct/:id', upload.single("productImage") ,verifyToken, requireRole(["farmer"]), productController.updateProduct);

router.get('/viewSales', verifyToken, requireRole(["farmer"]), orderController.viewSales);

module.exports = router;
