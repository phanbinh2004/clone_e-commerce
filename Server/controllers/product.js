const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require('slugify')

const createProduct = asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length === 0) throw new Error("Missing require params");
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title,"-");
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true: false,
        message: newProduct ? newProduct: "Create product failed",
    });
}); 


const getProduct = asyncHandler(async(req,res)=>{
    const {pid} = req.params;
    const product = await Product.findById(pid);
    return res.status(200).json({
        success: product ? true: false,
        productData: product ? product: "Can not found product",
    });
}); 
// Filtering , sorting pagination
const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find();
    return res.status(200).json({
        success: products ? true: false,
        productsData: products ? products: "Can not found products",
    });
}); 

const deleteProduct = asyncHandler(async(req,res)=>{
    const { pid } = req.query;
    if(!pid) throw new Error(`Missing id product`);
    const response = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: response ? true: false,
        message: response ? `Product has been deleted successfully`: "Product hasn't been deleted",
    });
}); 

const updateProduct = asyncHandler(async(req,res)=>{
    const {pid} = req.query;
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title,"-");
    const updatedProduct = await Product.findByIdAndUpdate({_id:pid},req.body,{new:true});
    return res.status(200).json({
        success: updatedProduct ? true: false,
        message: updatedProduct ? "Updated successfully": "Something wrong.Can not updated products",
    });
}); 
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}