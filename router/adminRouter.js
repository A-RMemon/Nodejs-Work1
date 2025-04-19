const express = require('express');
const router = express.Router();
const adminContoller = require('../controller/adminContoller')
router.post('/verifyadmin',adminContoller.login)

module.exports = router