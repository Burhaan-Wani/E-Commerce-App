const { z } = require("zod");

const productSchema = z
    .object({
        image: z.string(),
        title: z.string().min(1, "Title is required").max(100),
        description: z.string().max(1000),
        category: z.string(),
        brand: z.string(),
        price: z.number().positive("Price must be positive"),
        salePrice: z.number(),
        totalStock: z.number().int().nonnegative(),
    })
    .superRefine((data, ctx) => {
        if (data.salePrice > data.price) {
            ctx.addIssue({
                path: ["salePrice"],
                code: z.ZodIssueCode.custom,
                message: "Sale price cannot be greater than price",
            });
        }
    });
const productUpdateSchema = z
    .object({
        image: z.string(),
        title: z.string().min(1, "Title is required").max(100),
        description: z.string().max(1000),
        category: z.string(),
        brand: z.string(),
        price: z.number().positive("Price must be positive"),
        salePrice: z.number(),
        totalStock: z.number().int().nonnegative(),
    })
    .partial()
    .superRefine((data, ctx) => {
        if (data.salePrice > data.price) {
            ctx.addIssue({
                path: ["salePrice"],
                code: z.ZodIssueCode.custom,
                message: "Sale price cannot be greater than price",
            });
        }
    });

module.exports = { productSchema, productUpdateSchema };
