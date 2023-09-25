const express= require("express");
const { User_Module } = require("../model/user.model");
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const userRouter= express.Router();


userRouter.post("/register", async(req,res)=>{
    const {name,email,gender,pass}= req.body;
    const user= await User_Module.findOne({email:email})
    try {
        if(user){
            return res.status(400).send({msg:"Already user, Please Login"})
        }
        else{
            bcrypt.hash(pass, 5,async(err, hash)=> {
                const newUser= new User_Module({name,email,gender,pass:hash});
                await newUser.save();
                res.status(200).send({msg:"New user has been registered"})
                // Store hash in your password DB.
            });

        }
        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,pass}= req.body;
    try {
        const user= await User_Module.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                // result == true
                if(result){
                    res.status(200).send({msg:"Login successful",
                    token:jwt.sign({userId:user._id, email:user.email},"masai")
                })

                }
            });
        }
        else{
            res.status(200).send({msg:"wrong credential"})
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})


module.exports={
    userRouter
}