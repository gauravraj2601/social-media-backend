const express= require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const cors= require("cors")
require("dotenv").config();

const app= express();
app.use(express.json());
app.use(cors())
app.use("/users", userRouter)
app.use("/posts", postRouter)

app.get("/",(req,res)=>{
    try {
        res.status(200).send({msg:"Welcome to the Social Media App Home page"})
        
    } catch (error) {
        res.status(400).send({error:error})
    }
})

app.listen(process.env.PORT,async ()=>{
    try {
        await connection;
        console.log("Connected to DB at port 8080");

    } catch (error) {
        console.log(error.message)
    }
})