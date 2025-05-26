const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { signupSchema, loginSchema } = require("../utils/zod/auth.schema");
const handleZodError = require("../utils/zod/zodError");
const User = require("../models/user.model");

exports.signup = catchAsync(async function (req, res, next) {
    const data = handleZodError(req, next, signupSchema);
    if (!data) return;
    const { userName, email, password } = data;

    const existsUser = await User.findOne({ email });
    if (existsUser) {
        return next(
            new AppError(
                400,
                "This email ID is already taken. Please try new one"
            )
        );
    }

    await User.create({
        userName,
        email,
        password,
    });

    res.status(201).json({
        status: "success",
        message: "Signed up successfully",
    });
});

exports.login = catchAsync(async function (req, res, next) {
    const data = handleZodError(req, next, loginSchema);
    if (!data) return;

    const { email, password } = data;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new AppError(400, "User with this email doesn't exists"));
    }
    if (!(await user.comparePasswords(password))) {
        return next(new AppError(401, "Email or Password is incorrect"));
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email,
            userName: user.userName,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    // send a json web token through cookie
    res.cookie("jwt", token, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    const currentUser = user._doc;
    res.status(200).json({
        status: "success",
        message: "Login In Successful",
        data: {
            user: { ...currentUser, password: undefined },
        },
    });
});

exports.logout = catchAsync(async function (req, res, next) {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
        .status(200)
        .json({
            status: "success",
            message: "Logged out successfully",
        });
});

exports.me = catchAsync(function (req, res, next) {
    res.status(200).json({
        status: "success",
        message: "Authenticated User",
        data: {
            user: req.user,
        },
    });
});
