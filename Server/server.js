const express = require("express");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 8888;
app.use(express.json()); // cho phép data gửi theo dạng json
app.use(express.urlencoded({extended: true})) // cho phép data gửi theo dạng aray object, url

app.use("/",(req,res)=>{
    res.send("SERVER START");
});
app.listen(port,()=>{
    console.log("Server running on port: ",port);
})