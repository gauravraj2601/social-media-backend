const mongoose= require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    pass:String,
    
},{
    versionKey:false
})

const User_Module= mongoose.model("users", userSchema)

module.exports={
    User_Module
}