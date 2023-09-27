const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Fill All The Fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const newUser = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            pic: newUser.pic,
            token: generateToken(newUser._id),
        });
    } else {
        res.send(400);
        throw new Error("Failed To Create User");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists && (await userExists.verifyPassword(password))) {
        res.json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            pic: userExists.pic,
            token: generateToken(userExists._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email Or Password");
    }
});

module.exports = { registerUser, authUser };