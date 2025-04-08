const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const todoRouter = require('./todosRouter')

router.use('/auth',authRouter)
router.use('/todo',todoRouter)

module.exports= router;