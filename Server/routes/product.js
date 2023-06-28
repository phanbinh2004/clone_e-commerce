const router = require("express").Router(); 
const controls = require("../controllers/product");
const { verifyAccessToken,isAdmin } = require("../middlewares/verifyToken")
// route user
router.post("/create",[verifyAccessToken,isAdmin],controls.createProduct);
router.get("/get-products",controls.getProducts);
router.put("/ratings",verifyAccessToken,controls.ratings);


router.put("/update-product",[verifyAccessToken,isAdmin],controls.updateProduct);
router.put("/delete-product",[verifyAccessToken,isAdmin],controls.deleteProduct);
router.get("/:pid",controls.getProduct);
module.exports = router;