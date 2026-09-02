const mongoose=require('mongoose');



const musicSchema=new mongoose.Schema({
    musicTitle:String,
    music:String,
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
    
})

const musicmodel=mongoose.model('music',musicSchema);

module.exports=musicmodel;