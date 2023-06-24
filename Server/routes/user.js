const router = require("express").Router(); 
const controls = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken")
// route user
router.post("/auth/register",controls.register);
router.post("/auth/login",controls.login);
router.get("/current",verifyAccessToken,controls.getCurent);
router.post("/refreshtoken",controls.refreshAccessToken);
router.get('/logout',controls.logout);
router.get('/forgot-password',controls.forgotPassword);
router.post('/reset-password',controls.verifyResetPasswordWithToken);


module.exports = router;