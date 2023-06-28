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
const getProducts = asyncHandler(async (req, res) => {
    const queries = {...req.query};
    // Remove excluded fields
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(el=> delete queries[el])

    // Format operators for mongoose query
    let formattedFilters = JSON.stringify(queries);
    formattedFilters = formattedFilters.replace(/\b(gte|gt|lt|lte)\b/g, matched => `$${matched}`);
    formattedFilters = JSON.parse(formattedFilters);

    // Filtering
    if (queries?.title) formattedFilters.title = { $regex: filters.title, $options: 'i' };
    let queryCommand = Product.find(formattedFilters)

    // Sorting
    if(req.query.sort){
        const sortCriteria = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortCriteria);
    }

    // Fields limiting
    if(req.query.fields){
        console.log("prev",req.query.fields);
        const fields = req.query.fields.split(",").join(" ");
        console.log("next",fields);
        queryCommand = queryCommand.select(fields);
    }

    // Pagination
    let page = +req.query.page || 1;
    let limit = +req.query.limit || 10;
    let skip = ( page - 1 ) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);

    // Execute Query 
    try {
        const totalDocs = await Product.countDocuments(formattedFilters);
        const response = await queryCommand.exec();
        const pagination = {};
        pagination.curentPage = page;
        pagination.totalPages = Math.ceil(totalDocs/limit);
        pagination.limit = limit;
        pagination.totalCount = totalDocs;
        if(skip > 0){
            pagination.previousPage = page - 1;
        }
        if(skip + limit < totalDocs){
            pagination.nextPage = page + 1;
        }
        return res.status(200).json({
            success: true,
            count: response.length,
            pagination,
            productsData: response,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
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
    if(req.query && req.body.title) req.body.slug = slugify(req.body.title,"-");
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