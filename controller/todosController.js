const { populate } = require("../Models/authModel")
const todoModel = require("../Models/todoModel")
const todoValidate = require("../Validator/todoValidate")

exports.create = async (req,res)=>{
  try {
    console.log(req._id)
    const {title} = req.body
    const titleValidate = await todoValidate.validate(req.body)
    if(titleValidate.error){
      return res.status(400).json({
        message : titleValidate.error.details[0].message,
        status:false
      })
    }
    req.body.userId = req._id
    let todos = await todoModel(req.body);
    todos.save()
    return res.status(200).json({
        message: 'data saved successfully',
        data:todos

    })
    
  } catch (error) {
    return res.status(400).json({
        message: 'error in code',
        error: error.message

    })
  }
}
exports.getallTodos = async(req,res) => {
  try {
    let todos =await todoModel.find({userId:req._id}).populate({
      path:"userId",
      populate:({
        path:"profileId",
        select:"image age"
      })
    })
    console.log(todos)
    return res.status(200).json({
      message: 'all Todos of this user',
      todos
    })

    
  } catch (error) {
    return res.status(200).json({
      message: 'error',
     error
    })

  }
}

exports.deleteTodo = async(req,res) => {
  try {
    console.log(req.params.id);
    // let deleteTodo = await todoModel.findByIdAndDelete(req.params.id); //one trick and second is
    let deleteTodo = await todoModel.findOneAndDelete({_id:req.params.id,userId:req._id}); //other one
    
    
    return res.status(200).json({
      message: 'delete todo successfully',
    })
    
  } catch (error) {
    return res.status(200).json({
      message: 'error',
     error
    })

  }
}

exports.updateTodo = async (req,res) => {
  try {
    let updateTodo = await todoModel.findOneAndUpdate({_id:req.params.id,userId:req._id},{title: req.body.title}); //other one
    return res.status(200).json({
      message: 'updated Successfully successfully',
      updateTodo
    })
    
  } catch (error) {
    return res.status(200).json({
      message: 'error',
     error
    })

  }
}