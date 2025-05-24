const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err, // includes custom fields like isOperational
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    // Only show message if it's an operational error
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Unexpected error: log it and show generic message
        console.error("💥 UNEXPECTED ERROR:", err);
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    }
};

// Global error handler
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
};
