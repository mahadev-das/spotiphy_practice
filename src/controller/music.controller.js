const jwt = require("jsonwebtoken");
const usermodel = require("../models/auth.model");
const musicmodel = require("../models/music.model");
const uploadfile = require("../services/storage.service");

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

    if (user.role != "Artist") {
      return res.status(404).json({
        message: "you are not artist, Unauthorized user",
      });
    }

    if (user.role == "Artist") {
      const { title } = req.body
      console.log(title,'tttt');
      
      const file = req.file;
      console.log('after file');
      
      const result= await uploadfile.uploadfile(file);
      console.log(result,'result of imageKit');
      
      console.log(file, "file");

      // const result=await uploadfile.uploadfile(file)

      // const music=musicmodel.create({

      // })

      return res.status(200).json({
        message: "music created",
      });
    } else {
      return res.status(401).json({
        message: "unauthorized else part",
      });
    }
  } catch (err) {
    console.log(err,'errr');
    
    return res.status(401).json({
      message: "unauthorized catch part",
      err
    });
  }
}

module.exports = { musicCreate };
