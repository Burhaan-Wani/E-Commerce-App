const z = require("zod");

const addressSchema = z.object({
    userId: z.string(),
    address: z.string(),
    city: z.string(),
    pincode: z.string().min(5, "Pincode must be 5 or 6 digit"),
    state: z.string(),
    phone: z.string(),
    notes: z.string(),
    country: z.string().optional(),
});

module.exports = { addressSchema };
