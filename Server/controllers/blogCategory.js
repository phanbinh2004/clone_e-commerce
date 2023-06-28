const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createBlogCategory = asyncHandler(async(req,res)=>{
    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? response: "Create product category failed",
    });
}); 


const getBlogCategory = asyncHandler(async(req,res)=>{
    const product = await BlogCategory.find().select("title _id");
    return res.status(200).json({
        success: product ? true: false,
        productData: product ? product: "Can not found product category",
    });
}); 


const deleteBlogCategory = asyncHandler(async(req,res)=>{
    const { pid } = req.query;
    if(!pid) throw new Error(`Missing id product category`);
    const response = await BlogCategory.findByIdAndDelete(pid);
    return res.status(200).json({
        success: response ? true: false,
        message: response ? `Product Category has been deleted successfully`: "Product Category hasn't been deleted",
    });
}); 

const updateBlogCategory = asyncHandler(async(req,res)=>{
    const {pid} = req.query;
    const updatedProduct = await BlogCategory.findByIdAndUpdate({_id:pid},req.body,{new:true});
    return res.status(200).json({
        success: updatedProduct ? true: false,
        message: updatedProduct ? "Updated successfully": "Something wrong.Can not updated products",
    });
}); 

module.exports = {
    createBlogCategory,
    getBlogCategory,
    deleteBlogCategory,
    updateBlogCategory
}