const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");

const authMiddleware = catchAsync(async (req, _, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return next(
            new AppError(401, "You are not logged in. Please login first.")
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
        return next(
            new AppError(
                401,
                "The user belonging to this token no longer exists."
            )
        );
    }

    req.user = user;
    next();
});

module.exports = authMiddleware;
