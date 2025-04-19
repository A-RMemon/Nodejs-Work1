const express = require('express');
const router = express.Router();
const TodosController = require('../controller/todosController')
const { authMiddleware } = require('../middleWare/authMiddleWare');


router.post('/create',authMiddleware,TodosController.create);
router.post('/get',authMiddleware,TodosController.getallTodos);
router.post('/delete/:id',authMiddleware,TodosController.deleteTodo);
router.post('/update/:id',authMiddleware,TodosController.updateTodo);
module.exports = router