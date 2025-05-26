const express = require("express");
const { upload } = require("../middlewares/multer");
const {
    handleImageUpload,
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
} = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const accessTo = require("../middlewares/checkRole.middleware");

const router = express.Router();

router.use(authMiddleware);
router.use(accessTo("admin"));

router.route("/").get(getAllProducts).post(addProduct);
router.post("/upload-image", upload.single("my-file"), handleImageUpload);
router.patch("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
