const jwt = require("jsonwebtoken");
const usermodel = require("../models/auth.model");

async function musicCreate(req, res) {
  console.log(req.body, "create music");
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({
      message: "unauthorized user",
    });
  }

  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRETE);
    const user = await usermodel.findById({
      _id: decode.userid,
    });

    if(user.role=='Artist'){
        return res.status(200).json({
            message:'music created'
        })
    }else{
        return res.status(404).json({
            message:'you are not artist, Unauthorized user'
        })
    }
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  res.status(200).json({
    user,
  });
}

module.exports = { musicCreate };
