const express = require('express');
const router = express.Router();

const buyerRoutes = require('./buyer');
const farmerRoutes = require('./farmer');
// const adminRoutes = require('./admin');

router.use('/buyer', buyerRoutes);
router.use('/farmer', farmerRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;
