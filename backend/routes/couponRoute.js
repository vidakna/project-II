const express = require("express");
const {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
    getCouponByName
} = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.get("/:id", authMiddleware, isAdmin, getAllCoupons);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);
router.get("/getByName/:couponName", getCouponByName);

module.exports = router;