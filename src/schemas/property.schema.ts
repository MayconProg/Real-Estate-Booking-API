import z from "zod";
import { PropertyType } from "@prisma/client";

export const getPropertyByIdSchema = z.object({
  params: z.object({
    id: z.string({ message: "Missing Property ID!" }),
  }),
});

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(4, "Title must be at least 4 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    price: z
      .string()
      .min(1, { message: "Price must be at least 1 character long" }),
    type: z.nativeEnum(PropertyType, { message: "Invalid Property Type!" }),
    address: z.object({
      country: z
        .string()
        .min(1, { message: "Country must be at least 1 character long" }),
      state: z
        .string()
        .min(2, { message: "State must be at least 2 characters long" }),
      city: z
        .string()
        .min(2, { message: "City  must be at least 3 characters long" }),
      street: z
        .string()
        .min(1, { message: "Street must be at least 1 character long" }),
      number: z
        .string()
        .min(1, { message: "Number must be at least 1 character long" }),
      zipcode: z
        .string()
        .min(1, { message: "Zipcode must be at least 1 character long" }),
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
      price: z
        .string()
        .min(1, { message: "Price must be at least 1 character long" })
        .optional(),
      address: z
        .object({
          country: z
            .string()
            .min(1, { message: "Country must be at least 1 character long" })
            .optional(),
          state: z
            .string()
            .min(2, { message: "State must be at least 2 characters long" })
            .optional(),
          city: z
            .string()
            .min(2, { message: "City  must be at least 3 characters long" })
            .optional(),
          street: z
            .string()
            .min(1, { message: "Street must be at least 1 character long" })
            .optional(),
          number: z
            .string()
            .min(1, { message: "Number must be at least 1 character long" })
            .optional(),
          zipcode: z
            .string()
            .min(1, { message: "Zipcode must be at least 1 character long" })
            .optional(),
        })
        .refine((data) => Object.keys(data).length > 0, {
          message: "At least one field of address must be provided",
        })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    id: z.string({ message: "Missing Property ID!" }).uuid(),
  }),
});

export const deletePropertySchema = z.object({
  params: z.object({
    id: z.string({ message: "Missing Property ID!" }).uuid(),
  }),
});
