const express = require('express');
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
//createUser
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/logout", logout);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;