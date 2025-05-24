const handleZodError = (req, schema) => {
    const { success, data, error } = schema.safeParse(req.body);
    if (!success) {
        const errors = error.issues.map(err => err.message).join(". ");
        return next(new AppError(400, errors));
    }
    return data;
};

module.exports = handleZodError;
