const express = require("express");
const router = express.Router();
const url = require("url");
const { signup, updateUser, signin } = require("../controller/auth");

router.post("/signup", signup);
router.post("/updateuser", updateUser);
router.post("/signin", signin);

module.exports = router;
