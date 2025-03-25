const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const { authMiddleware } = require('../middleWare/authMiddleWare');
router.post('/signup',authController.signup);
router.post('/verifyotp',authMiddleware,authController.verifyOtp);

module.exports = router