const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const todoRouter = require('./todosRouter')
const adminRouter = require('./adminRouter')

router.use('/auth',authRouter)
router.use('/todo',todoRouter)
router.use('/admin',adminRouter)

module.exports= router;