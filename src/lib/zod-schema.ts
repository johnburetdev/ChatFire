import {z} from "zod";

export const loginZodSchema = z.object({
    email: z.string().trim().pipe(z.email("Invalid Format")),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type loginZodSchemaType = z.infer<typeof loginZodSchema>

export const registerZodSchema = z.object({
    email: z.string().trim().pipe(z.email()),
    displayName: z
    .string()
    .min(1, "Display name is required")
    .max(50, "Display name must be at most 50 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least special character"),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
})

export type registerZodSchemaType = z.infer<typeof registerZodSchema>;

export const profileZodSchema = z.object({
    displayName: z
    .string()
    .min(1, "Display name is required")
    .max(50, "Display name must be at most 50 characters long"),
    photoURL: z.union([z.url("Invalid URL format"), z.literal("")]).optional(),
})

export type ProfileZodSchemaType = z.infer<typeof profileZodSchema>;


export const taskZodSchema = z.object({
    title: 
    z.string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters long"),
    description: 
    z.string()
    .max(500, "Description must be at most 500 characters long")
    .optional()
})

export type TaskZodSchemaType = z.infer<typeof taskZodSchema>