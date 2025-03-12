const express = require('express');
const router = express.Router();

const userController = require('../v1.controllers/userController');
const buyerRoutes = require('./buyer');
const farmerRoutes = require('./farmer');
// const adminRoutes = require('./admin');

router.use('/buyer', buyerRoutes);
router.use('/farmer', farmerRoutes);
router.delete('/logout', userController.logout);
// router.use('/admin', adminRoutes);

module.exports = router;
