const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth.routes");
const globalErrorHandler = require("./controllers/error.controller");

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

// ROUTES
app.use("/api/v1/auth", authRoutes);

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
