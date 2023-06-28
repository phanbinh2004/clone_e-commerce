const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const createProductCategory = asyncHandler(async(req,res)=>{
    const response = await ProductCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? response: "Create product category failed",
    });
}); 


const getProductCategory = asyncHandler(async(req,res)=>{
    const product = await ProductCategory.find().select("title _id");
    return res.status(200).json({
        success: product ? true: false,
        productData: product ? product: "Can not found product category",
    });
}); 


const deleteProductCategory = asyncHandler(async(req,res)=>{
    const { pid } = req.query;
    if(!pid) throw new Error(`Missing id product category`);
    const response = await ProductCategory.findByIdAndDelete(pid);
    return res.status(200).json({
        success: response ? true: false,
        message: response ? `Product Category has been deleted successfully`: "Product Category hasn't been deleted",
    });
}); 

const updateProductCategory = asyncHandler(async(req,res)=>{
    const {pid} = req.query;
    const updatedProduct = await ProductCategory.findByIdAndUpdate({_id:pid},req.body,{new:true});
    return res.status(200).json({
        success: updatedProduct ? true: false,
        message: updatedProduct ? "Updated successfully": "Something wrong.Can not updated products",
    });
}); 

module.exports = {
    createProductCategory,
    getProductCategory,
    deleteProductCategory,
    updateProductCategory
}