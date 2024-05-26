const express = require("express");

const router = express.Router();

const userSignUp = require("../controller/userSignup");
const userSignin = require("../controller/userSignin");
const userDetailCtrl = require("../controller/userDetails");
const authToken = require("../middlewares/authToken");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/AllUsers");

router.post("/signup", userSignUp);
router.post("/signin", userSignin);
router.get("/user-details", authToken, userDetailCtrl);
router.get("/userLogout", userLogout);

// admin
router.get("/all-user", authToken, allUsers);

module.exports = router;
