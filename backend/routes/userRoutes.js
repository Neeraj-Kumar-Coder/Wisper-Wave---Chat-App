const express = require("express");
const {
    registerUser,
    authUser,
    allUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(protect, allUser);

module.exports = router;
