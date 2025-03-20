import { ScheduleStatus } from "@prisma/client";
import z from "zod";

export const getScheduleByIdSchema = z.object({
  params: z.object({
    id: z.string({ message: "Missing Schedule ID!" }).uuid(),
  }),
});

export const createScheduleSchema = z.object({
  body: z.object({
    startTime: z
      .string()
      .datetime({ message: "startTime Must To Be Datetime Type!" }),
    endTime: z
      .string()
      .datetime({ message: "endTime Must To Be Datetime Type!" }),
  }),
  params: z.object({
    id: z.string({ message: "Missing Property ID!" }).uuid(),
  }),
});

export const updateScheduleSchema = z.object({
  body: z
    .object({
      startTime: z
        .string()
        .datetime({ message: "startTime Must To Be Datetime Type!" })
        .optional(),
      endTime: z
        .string()
        .datetime({ message: "endTime Must To Be Datetime Type!" })
        .optional(),
      status: z
        .nativeEnum(ScheduleStatus, { message: "Invalid Status Type!" })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),
  params: z.object({
    id: z.string({ message: "Missing Schedule ID!" }).uuid(),
  }),
});

export const deleteScheduleSchema = z.object({
  params: z.object({
    id: z.string({ message: "Missing Schedule ID!" }).uuid(),
  }),
});
