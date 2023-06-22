const router = require("express").Router(); 
const controls = require("../controllers/user");
router.post("/auth/register",controls.register);

module.exports = router;