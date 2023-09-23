const express = require('express');
const {passwordRestRq} = require("../controller/userCtrl");
const {getaUserNo} = require("../controller/userCtrl");
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus,getAllOrders ,activeAccount, deleteOrder,getOrderById , getMonthWiseOrder,getOrdersAll,passwordReset } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//createUser
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/password-reset", passwordReset);
router.get("/login/:uuid", activeAccount);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.get("/getMonthWiseOrder", getMonthWiseOrder);
router.get("/get-all-orders", getOrdersAll);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware,isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware,isAdmin, getAllOrders);
router.get("/getOrderById/:id", authMiddleware,isAdmin, getOrderById);
router.get("/deleteOrder/:id", authMiddleware,isAdmin, deleteOrder);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/pw-r/:id", getaUserNo);
router.post("/pw-r/req", passwordRestRq);
router.get("/single/:id", authMiddleware, getaUser);

router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);



module.exports = router;