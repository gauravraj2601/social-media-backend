
const express= require("express");
const { Post_Module } = require("../model/post.model");
const { auth } = require("../middleware/auth.middleware");
const postRouter= express.Router();

postRouter.use(auth)

postRouter.get("/", async(req,res)=>{
    try {
        console.log("hai")
        const {device}= req.params;
        const post= await Post_Module.find({userId:req.body.userId})
     
        res.status(200).send(post)

    } catch (error) {
        res.status(400).send({error:error.message})
    }
})


postRouter.post("/add",async(req,res)=>{
    const payload= req.body;
    try {
        const post= new Post_Module(payload)
        await post.save();
        res.status(200).send({msg:"A new post is Added"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

postRouter.patch("/update/:postId",async(req, res)=>{
    const {postId}= req.params;
    const post= await Post_Module.findOne({_id:postId});
    const payload= req.body;
    try {
        if(req.body.userId===post.userId){
            await Post_Module.findByIdAndUpdate({_id:postId,payload})
            res.status(200).send({msg:`Post with postId ${postId} is Updated`})
        }
        else{
            res.status(400).send({msg:"You are not authorized"})
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})




module.exports={
    postRouter
}