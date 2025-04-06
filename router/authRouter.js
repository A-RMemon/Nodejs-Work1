const express = require('express');
const router = express.Router();
const multer  = require('multer');
const cloudinary = require('cloudinary').v2
const authController = require('../controller/authController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post('/signup',authController.signup);
router.post('/verifyotp',authMiddleware,authController.verifyOtp);
router.post('/completeProfile',authMiddleware,upload.single("image"),authController.completeProfile)
router.post('/login',authController.login);

module.exports = router