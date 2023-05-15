const express = require('express');
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedaUser, updatedUser } = require('../controller/userCtrl');
const { getRounds } = require('bcrypt');
const router = express.Router();
//createUser
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/:id", getaUser);
router.delete("/:id", deleteaUser);
router.put("/:id", updatedUser);
module.exports = router;