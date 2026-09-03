const express=require('express');
const musicCreate=require('../controller/music.controller');
const multer=require('multer')
const upload = multer({ dest: 'uploads/' })


const router=express.Router();

router.post('/create',upload.single('music'), musicCreate.musicCreate)



module.exports=router