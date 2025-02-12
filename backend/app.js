const express =require('express');
require("dotenv").config();

const connection=require('./Database/database');
const routes=require('./Routes/routes');
const app=express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port=5000;
app.use('/',routes);
app.listen(port,()=>{
    console.log("5000 listening");
})
