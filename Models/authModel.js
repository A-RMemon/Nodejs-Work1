const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    verify:{
        type:Boolean,
        required:false,
        default:false
    },
    otpCode:{
        type:String,
        required:true,
        default:""
    }
})
module.exports = mongoose.model("register",authSchema);