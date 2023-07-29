const Product = require("../models/productModel");
const User = require("../models/userMOdel");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require("../utils/cloudinary");
const validateMongoDbId = require("../utils/validateMongodbid");
const createProduct = asyncHandler(async(req, res) => {
    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});
// const updateProduct = asyncHandler(async(req, res) => {
//     const { id } = req.params;
//     try {

//         if (req.body.title) {
//             req.body.slug = slugify(req.body.title);
//         }
//         const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
//             new: true,
//         });

//         res.json(updateProduct);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

const updateProduct = asyncHandler(async(req, res, next) => {
    try {
        const { id } = req.params;

        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const updatedProduct = await Product.findOneAndUpdate({ _id: id },
            req.body, { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});
const deleteProduct = asyncHandler(async(req, res, next) => {
    try {
        const { id } = req.params;



        const deleteProduct = await Product.findOneAndDelete({ _id: id },
            req.body, { new: true }
        );

        if (!deleteProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(deleteProduct);
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});

const getaProduct = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllProduct = asyncHandler(async(req, res) => {
    try {
        //Filtering
        const queryObj = {...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        // console.log(queryObj, req.query);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        //console.log(JSON.parse(queryStr));

        let query = Product.find(JSON.parse(queryStr));
        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }
        //limiting the fields

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This page does not exists");
        }
        console.log(page, limit, skip);


        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});
const addToWishlist = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
        if (alreadyadded) {
            let user = await User.findByIdAndUpdate(
                _id, {
                    $pull: { wishlist: prodId },
                }, {
                    new: true,
                }
            );
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id, {
                    $push: { wishlist: prodId },
                }, {
                    new: true,
                }
            );
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});
const rating = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);

        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby && userId.postedby.toString() === _id.toString()
        );

        if (alreadyRated) {
            const updateRating = await Product.updateOne({
                ratings: { $elemMatch: alreadyRated },
            }, {
                $set: { "ratings.$.star": star, "ratings.$.comment": comment },
            }, {
                new: true,
            });
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId, {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: _id,
                        },
                    },
                }, {
                    new: true,
                }
            );
        }
        const getallratings = await Product.findById(prodId);
        let totalRating = getallratings.ratings.length;
        let ratingsum = getallratings.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(
            prodId, {
                totalrating: actualRating,
            }, { new: true }
        );
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error);
    }
});
const uploadImages = asyncHandler(async(req, res) => {

    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const images = urls.map((file) => {
            return file;
        });
        res.json(images);

    } catch (error) {
        throw new Error(error);
    }
    // console.log(req.files);
});
const deleteImages = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const deleted = cloudinaryDeleteImg(id, "images");
        res.json({ message: "Deleted" });
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages, deleteImages };