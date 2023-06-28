const router = require("express").Router(); 
const controls = require("../controllers/productCategory");
const { verifyAccessToken,isAdmin } = require("../middlewares/verifyToken")
// route product categỏy
router.post("/create",[verifyAccessToken,isAdmin],controls.createProductCategory);
router.get("/get-product-category",controls.getProductCategory);
router.delete("/delete-product-category",[verifyAccessToken,isAdmin],controls.deleteProductCategory);
router.put("/update-product-category",[verifyAccessToken,isAdmin],controls.updateProductCategory);

module.exports = router;