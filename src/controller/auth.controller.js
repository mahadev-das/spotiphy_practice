const usermodel=require('../models/auth.model')

async function userRagistration(req,res){
    const {username,email,password}=req.body;

    const user= await usermodel.create({
        username,email,password
    })

    res.status(200).json({username,email,password,user});
}


module.exports={userRagistration}