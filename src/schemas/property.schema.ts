import { PropertyType } from "@prisma/client";
import { title } from "process";
import z from "zod";

export const getPropertyByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(4, "Title must be at least 4 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    price: z.string(),
    type: z.nativeEnum(PropertyType),
    address: z.object({
      country: z.string(),
      state: z.string(),
      city: z.string(),
      street: z.string(),
      number: z.string(),
      zipcode: z.string(),
    }),
  }),
});

export const updatePropertySchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .min(4, "Title must be at least 4 characters long")
        .optional(),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .optional(),
      price: z.string().optional(),
      address: z
        .object({
          country: z.string().optional(),
          state: z.string().optional(),
          city: z.string().optional(),
          street: z.string().optional(),
          number: z.string().optional(),
          zipcode: z.string().optional(),
        })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deletePropertySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
