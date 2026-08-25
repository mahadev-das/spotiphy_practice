const express=require('express');
const registrationController=require('../controller/auth.controller');

const router=express.Router()


router.post('/registration',registrationController.userRagistration)

router.post('/login',registrationController.userLogin);
module.exports=router;