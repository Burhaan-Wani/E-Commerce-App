const express = require("express");
const {
    addAddress,
    fetchAllAddress,
    deleteAddress,
    updateAddress,
} = require("../controllers/address.controller");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", updateAddress);
module.exports = router;
