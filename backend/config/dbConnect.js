const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Error");
    }
};
module.exports = dbConnect;

// const mongoose = require("mongoose");

// const dbConnect = async() => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL);
//         console.log("Database Connected Successfully");
//     } catch (error) {
//         console.log("Database Error");
//     }
// };

// module.exports = dbConnect;