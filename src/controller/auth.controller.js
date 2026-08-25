const usermodel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

async function userRagistration(req, res) {
  const { username, email, role, password } = req.body;

  const user = await usermodel.create({
    username,
    email,
    role,
    password,
  });

  const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRETE);
  console.log(token)
  res.cookie('token',token);
  res.status(200).json({
    success:true,
    message:'success',
    username,
    email,
    password,
    user,
    token
  });
}

async function userLogin(req,res){
    console.log(req.body,'userLogin');
    const {username,email,password}=req.body;

    const user= usermodel.find({

    })

    res.status(200).json({
        success:'true'
    })
}

module.exports = { userRagistration, userLogin }
