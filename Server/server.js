const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");


const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json()); // cho phép data gửi theo dạng json
app.use(express.urlencoded({extended: true})) // cho phép data gửi theo dạng aray object, url
connectDB();
initRoutes(app);
app.listen(port,()=>{
    console.log("Server running on port: ",port);
})