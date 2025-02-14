
require("dotenv").config();

const connection=require('./Database/database');
const routes=require('./Routes/routes');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ✅ Increase the file size limit
app.use(bodyParser.json({ limit: "50mb" }));  // Increase JSON payload limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Increase form-data limit

app.use(cors());

app.use(express.json()); // Ensure Express JSON can handle large data
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const port=5000;
app.use('/',routes);
app.listen(port,()=>{
    console.log("5000 listening");
})
