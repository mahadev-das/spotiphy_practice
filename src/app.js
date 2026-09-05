const express=require('express');
const multer=require('multer');
const authRoute=require('./routes/auth.route');
const musicRoute=require('./routes/music.route')
const cookieParser=require('cookie-parser')
const app=express();


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({encoded:true}))
const upload=multer({storage:multer.memoryStorage()});


app.use('/api/auth',authRoute);
app.use('/api/music',upload.single("music"),musicRoute);


module.exports=app;