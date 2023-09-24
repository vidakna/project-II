const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongodbid");
const asynHandler = require("express-async-handler");

const createCoupon = asynHandler(async(req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllCoupons = asynHandler(async(req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error);
    }
});
const updateCoupon = asynHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatecoupon);
    } catch (error) {
        throw new Error(error);
    }
});
const deleteCoupon = asynHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletecoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletecoupon);
    } catch (error) {
        throw new Error(error);
    }
});
const getCoupon = asynHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getAcoupon = await Coupon.findById(id);
        res.json(getAcoupon);
    } catch (error) {
        throw new Error(error);
    }
});

const getCouponByName = asynHandler(async (req , res) =>{
    const {couponName} = req.params;

    try {
        // Search for the coupon by name in the database
        const coupon = await Coupon.findOne({ name: couponName.toUpperCase() });

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json(coupon);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
    getCoupon,
    getCouponByName
};