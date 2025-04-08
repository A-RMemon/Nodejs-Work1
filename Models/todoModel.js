const { default: mongoose, model } = require("mongoose");
const { type } = require("../Validator/todoValidate");

const todoModel = mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    status:{
        type:String,
        enum:["pending","inprocess","completed","delete"],
        default:"pending"
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'register',
        required: true
    }
})
module.exports = mongoose.model('Todos',todoModel)