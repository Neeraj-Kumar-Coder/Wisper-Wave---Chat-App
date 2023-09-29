const express = require("express");
const { protect } = require("../middleware/authorizationMiddleware");
const { accessChat, fetchChats } = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroupChat);
// router.route("/groupadd").put(protect, addToGroup);
// router.route("/groupremove").put(protect, removeFromGroup);

module.exports = router;
