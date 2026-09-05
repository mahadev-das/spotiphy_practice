const express=require('express');
const musicCreate=require('../controller/music.controller');

const router=express.Router();

router.post('/create', musicCreate.musicCreate)



module.exports=router