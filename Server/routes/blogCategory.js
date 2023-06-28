const router = require("express").Router(); 
const controls = require("../controllers/blogCategory");
const { verifyAccessToken,isAdmin } = require("../middlewares/verifyToken")
// route product categỏy
router.post("/create",[verifyAccessToken,isAdmin],controls.createBlogCategory);
router.get("/get-blog-category",controls.getBlogCategory);
router.delete("/delete-blog-category",[verifyAccessToken,isAdmin],controls.deleteBlogCategory);
router.put("/update-blog-category",[verifyAccessToken,isAdmin],controls.updateBlogCategory);

module.exports = router;