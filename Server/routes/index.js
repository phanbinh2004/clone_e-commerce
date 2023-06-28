const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const {notFound,errHandler} = require("../middlewares/errorHandler");
const initRoutes = (app) =>{
    app.use("/api/v1/user",userRouter);
    app.use("/api/v1/product",productRouter);
    app.use("/api/v1/productcategory",productCategoryRouter);
    app.use("/api/v1/blogcategory",blogCategoryRouter);



    app.use(notFound);
    app.use(errHandler);
}
module.exports = initRoutes;