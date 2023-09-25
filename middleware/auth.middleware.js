const jwt= require("jsonwebtoken");

const auth=(req, res,next)=>{
    const token=req.headers.authorization;
 
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userId= decoded.userId
                // req.body.email= decoded.email
                next()
            }
            else{
                res.send({error:err.message})
            }
        })
    }
    else{
        res.send({"msg":"Please Login"})
    }
}
module.exports={
    auth
}