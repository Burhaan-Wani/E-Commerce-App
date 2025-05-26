const AppError = require("../appError");

const handleZodError = (req, next, schema) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.issues.map(err => err.message).join(". ");
        next(new AppError(400, errors));
        return null;
    }

    return result.data;
};

module.exports = handleZodError;
