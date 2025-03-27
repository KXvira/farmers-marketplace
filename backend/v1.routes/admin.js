const express = require('express');
const userController = require('../v1.controllers/userController');
const orderController = require('../v1.controllers/orderController');
const { verifyToken, requireRole } = require('../v1.middlewares/autheticate');

const router = express.Router();

router.post('/login', userController.adminLogin);

router.post('/updateorderstatus', verifyToken, requireRole(["admin"]), orderController.placeOrder);

module.exports = router;