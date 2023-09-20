const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // Existing fields
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        count: Number,
        color: String,
    }],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",
        ],
    },
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    year: Number, // Remove 'required: true'
    month: Number, // Remove 'required: true'
    firstName : String,
    lastName : String,
    address : String,
    phone : String,
    city : String,
    zipCode : String,
    orderPrice : Number
}, {
    timestamps: true,
});

// Export the model
const Order = mongoose.model("Order", orderSchema);

// Define a pre-save hook to update year and month before saving
orderSchema.pre("save", function(next) {
    // Update the year and month based on createdAt
    const createdAt = this.createdAt || new Date();
    this.year = createdAt.getFullYear();
    this.month = createdAt.getMonth() + 1; // Months are 0-indexed, so add 1
    next();
});

module.exports = Order;
