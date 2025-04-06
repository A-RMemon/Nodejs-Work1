const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    age:{
        type:Number,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    image:{
        type:String,
        required:true
    },
    authId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'register',
        required:true
    }
})
module.exports = mongoose.model("Profile",authSchema);