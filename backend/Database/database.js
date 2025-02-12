const mongoose=require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/EternalBond').then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log({msg:err.message});
});
module.exports=connection;