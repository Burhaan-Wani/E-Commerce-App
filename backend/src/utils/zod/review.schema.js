const z = require("zod");

const reviewSchema = z.object({
    productId: z.string(),
    userId: z.string(),
    reviewMessage: z.string(),
    reviewValue: z.number(),
});

module.exports = {
    reviewSchema,
};
