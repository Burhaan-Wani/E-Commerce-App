const z = require("zod/v4");

const signupSchema = z.object({
    userName: z
        .string()
        .min(3, "Username must be atleast 3 characters")
        .max(30)
        .toLowerCase(),
    email: z.email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});
module.exports = {
    signupSchema,
    loginSchema,
};
