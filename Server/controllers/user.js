const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { generateAccessToken,generateRefreshToken } = require("../middlewares/jsonWebToken");
const register = asyncHandler(async(req,res)=>{
    const {email,password,firstName,lastName} = req.body;
    if(!email || !password || !firstName || !lastName){
        return res.status(400).json({
            success: false,
            message:"Missing require parameter!!",
        });
    }
    const user = await User.findOne({ email });
    if(user){
        throw new Error(`User with email:${email} has existed!`);
    }else{
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? "Register is successfully": "Register is failure!",
        });
    }
});
// Refresh Token: Cấp mới access token
// Access Token: Xác thực người dùng, phân quyền người dùng 
const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message:"Missing require parameter!!",
        });
    }
    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isCorrectPassword(password)){
        const {password,role,...userData} = findUser.toObject();
        // Access Token - Refresh Token
        const accessToken = generateAccessToken(findUser._id,role);
        const refreshToken = generateRefreshToken(findUser._id);
        // Save refreshToken to database
        await User.findByIdAndUpdate(findUser._id,{refreshToken},{ new: true });
        // Save refreshToken to cookie
        res.cookie("refreshToken",refreshToken,{ httpOnly:true, maxAge: 7*24*60*60*1000});
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        });
    }else{
        throw new Error(`Invalid credentials!`);
    }
});
const getCurent = asyncHandler(async(req,res) => {
    const {_id } = req.user;
    const user = await User.findById({ _id }).select("-refreshToken -password -role");
    return res.status(200).json({
        success: true,
        result: user ? user : "User not found!",
    });
});

const refreshAccessToken = asyncHandler(async (req,res)=>{
    // Lay token tu cookie
    const cookie = req.cookies;
    // Check token cos hay khong 
    if(!cookie && !cookie.refreshToken){
        throw new Error("Don't have refreshToken in cookie");
    } 
    // Check token hop le hay khong
    jwt.verify(cookie.refreshToken,process.env.JWT_SECRET,async(err,decode)=>{
        if(err) 
            return res.status(401).json({
                success: false,
                message: "Refresh token has expired",
            });
        // Check token xem co khop voi token database khong
        const response = await User.findOne({_id:decode._id,refreshToken: cookie.refreshToken});
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response._id,response.role) : "RefreshToken not matched!",
        });
    });
});

const logout = asyncHandler(async (req,res)=>{
    const cookie = req.cookies;
    if(!cookie || !cookie.refreshToken) throw new Error("No refresh token in cookies");
    // Xoá refreshToken trong DB
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken},{refreshToken: ""},{new:true});
    // Xoá refreshToken ở cookies trên trình duyệt
    res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: true,
    });
    return res.status(200).json({
        success: true,
        message: "Logout!"
    });
});
module.exports = {
    register,
    login,
    getCurent,
    refreshAccessToken,
    logout
}

