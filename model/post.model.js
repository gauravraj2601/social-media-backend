const mongoose= require("mongoose");

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userId:String
},
    {
        versionKey:false
    }
)

const Post_Module= mongoose.model("posts", postSchema)

module.exports={
    Post_Module
}