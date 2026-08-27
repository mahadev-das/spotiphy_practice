const usermodel = require("../models/auth.model");
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");

async function userRagistration(req, res) {
  const { username, email, role, password } = req.body;

  const isUserExist= await usermodel.findOne({
    $or:[{username},{email}]
  })

  if(isUserExist){
    return res.status(409).json({
      message:'user alrady exist',
      isUserExist
    })
  }

  const hash=await bcrypt.hash(password,10);

  const user = await usermodel.create({
    username,
    email,
    role,
    password:hash,
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

    const user=await usermodel.find({
      $or:[{username},{email}]
    })

    console.log(user,'user');
    

    if(user.length<=0){
      return res.status(401).json({
        message:'Unauthorize user'
      })
    }

    const passwordCheck= await usermodel.find({
      password
    })

    console.log(passwordCheck,'passwordcheck');
    
    if(passwordCheck.length<=0){
      return res.status(401).json({
        message:'Unauthorized user , wron password'
      })
    }

    const token =jwt.sign({userid:user._id},process.env.JWT_SECRETE);
    res.cookie('token',token);
    res.status(200).json({
        success:'true',
        message:'login successfully',
        user,
        username,
        email,
        password
    })
}

module.exports = { userRagistration, userLogin }
