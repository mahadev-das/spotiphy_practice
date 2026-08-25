const mongoose=require('mongoose');


const registerUserSchema= new mongoose.Schema({
    // username:{
    //     type:String,
    //     unique:true,
    //     required:true
    // },
    // email:{
    //     type:String,
    //     unique:true,
    //     required:true
    // },

    // password:{
    //     type:String,
    //     required:true
    // }
},{strict:false});

const userModel=mongoose.model('user',registerUserSchema);
module.exports=userModel;