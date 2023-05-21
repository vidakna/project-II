const { generateToken } = require("../config/jwtToken");
const User = require("../models/userMOdel");
const asyncHandler = require("express-async-handler");


const createUser = asyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists");
    }
});
const loginUserCtrl = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    //check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser._id),
        });

    } else {
        throw new Error("Invalid Credentials");
    }
});

//Update a user
// const updatedUser = asyncHandler(async(req, res) => {
//     const { id } = req.params;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             id, {
//                 firstname: req ? .body ? .firstname,
//                 lastname: req ? .body ? .lastname,
//                 email: req ? .body ? .email,
//                 mobile: req ? .body ? .mobile,
//             }, {
//                 new: true,
//             }
//         );
//         res.json(updatedUser);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

const updatedUser = asyncHandler(async(req, res) => {
    //console.log.user;
    const { _id } = req.user;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id, {
                firstname: req.body ? req.body.firstname : undefined,
                lastname: req.body ? req.body.lastname : undefined,
                email: req.body ? req.body.email : undefined,
                mobile: req.body ? req.body.email : undefined,
            }, {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});



//Get all users
const getallUser = asyncHandler(async(req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);

    }
});
// module.exports = { createUser };

// const User = require("../models/userMOdel");

// const createUser = async(req, res) => {
//     const email = req.body.email;
//     const findUser = await User.find({ email: email });
//     if (!findUser) {
//         //create a new user
//         const newUser = await User.create(req.body);
//         res.json(newUser);
//     } else {
//         res.json({
//             msg: "User Already Exists",
//             success: false,
//         });
//     }
// };

// module.exports = { createUser };

// const User = require("../models/userMOdel");

// const createUser = async(req, res) => {
//     const email = req.body.email;
//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.json({
//                 msg: "User Already Exists",
//                 success: false,
//             });
//         }
//         const newUser = await User.create(req.body);
//         res.json(newUser);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: "Server Error",
//             success: false,
//         });
//     }
// };

//Get a single user

const getaUser = asyncHandler(async(req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        })
    } catch (error) {
        throw new Error(error);
    }
});

//Delete user

const deleteaUser = asyncHandler(async(req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    } catch (error) {
        throw new Error(error);
    }
});
const blockUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const block = await User.findByIdAndUpdate(
            id, {
                isBlocked: true,

            }, {
                new: true,
            }
        );
        res.json({
            message: "User Blocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});
const unblockUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const unblock = await User.findByIdAndUpdate(
            id, {
                isBlocked: false,

            }, {
                new: true,
            }
        );
        res.json({
            message: "User UnBlocked",
        });

    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser };