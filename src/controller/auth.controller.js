const usermodel = require("../models/auth.model");
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");

async function userRagistration(req, res) {
  const { username, email, role, password } = req.body;

  if(!username || !email || !role || !password){
    return res.status(400).json({
      message:"some field missing"
    })
  }

  const isUserExist= await usermodel.findOne({
    $or:[{email}]
  })

  if(isUserExist){
    return res.status(409).json({
      message:'user alrady exist',
      isUserExist
    })
  }

  const isUserNameExist= await usermodel.findOne({
    username
  });
  if(isUserNameExist){
    return res.status(409).json({
        message:'username alrady exist'
    })
  }

  const hash=await bcrypt.hash(password,10);

  const user = await usermodel.create({
    username,
    email,
    role,
    password:hash,
  });

  const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRETE,{expiresIn:'1d'});
  console.log(token)
  res.cookie('token',token,{
    httpOnly:true,

  });
  return res.status(200).json({
    success:true,
    message:'Registration successful',
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

    if(!password){
      return res.status(400).json({
        message:"some field missing"
      })
    }

    const isUserExist=await usermodel.findOne({
      $or:[{username},{email}]
    })
    console.log(isUserExist,'userxxx');
    

    if(!isUserExist){
      return res.status(401).json({
        message:'Unauthorize user'
      })
    }

    const hash=await bcrypt.compare(password,isUserExist.password);
    console.log(hash,'hasshhh');

    const token = await jwt.sign({userid:isUserExist._id},process.env.JWT_SECRETE);
    res.cookie('token',token);
    res.status(200).json({
        success:'true',
        message:'login successfully',
        isUserExist,
        username,
        email,
        password
    })
}

module.exports = { userRagistration, userLogin }
