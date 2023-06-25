const router = require("express").Router(); 
const controls = require("../controllers/user");
const { verifyAccessToken,isAdmin } = require("../middlewares/verifyToken")
// route user
router.post("/auth/register",controls.register);
router.post("/auth/login",controls.login);
router.get("/current",verifyAccessToken,controls.getCurent);
router.post("/refreshtoken",controls.refreshAccessToken);
router.get('/logout',controls.logout);
router.get('/forgot-password',controls.forgotPassword);
router.put('/reset-password',controls.verifyResetPasswordWithToken);
router.get("/",[verifyAccessToken,isAdmin],controls.getAllUsers);
router.delete("/",[verifyAccessToken,isAdmin],controls.deleteUser);
router.put("/current",[verifyAccessToken],controls.updateUser);
router.put("/:uid",[verifyAccessToken,isAdmin],controls.updateUserByAdmin);

module.exports = router;