const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
},
{
    timestamps:true,versionKey:false
});

module.exports = mongoose.model("user",userSchema);