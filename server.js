require('dotenv').config();
const connectdb=require('./src/DB/db');
const app=require('./src/app')




connectdb();
app.listen(3000,()=>{
    console.log('server running on port 3000');
    
})