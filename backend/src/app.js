const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth.routes");
const featureRoutes = require("./routes/feature.routes");
const addressRoutes = require("./routes/address.routes");
const productRoutes = require("./routes/product.routes");
const reviewRoutes = require("./routes/review.routes");
const cartRoutes = require("./routes/cart.routes");
const adminProductRoutes = require("./routes/admin.routes");
const adminOrderRoutes = require("./routes/adminOrder.routes");
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
app.use("/api/v1/feature", featureRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/admin/products", adminProductRoutes);
app.use("/api/v1/admin/orders", adminOrderRoutes);

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
