const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
    }],
    cartTotal: Number,
    totalAfterDiscount: Number,
    active: {
        type: Boolean, // Boolean field for cart activity
        default: true, // You can set a default value if needed
    },
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

// Export the model
module.exports = mongoose.model("Cart", cartSchema);
