const AppError = require("../utils/appError");

const accessTo = function (...args) {
    return function (req, _, next) {
        if (!args.includes(req.user.role)) {
            return next(
                new AppError(
                    401,
                    "You do not have permission to perform this action"
                )
            );
        }
        next();
    };
};

module.exports = accessTo;
