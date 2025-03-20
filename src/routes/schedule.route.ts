import { Router } from "express";
import { ScheduleController } from "../controllers/schedule.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/user.middleware";
import {
  createScheduleSchema,
  deleteScheduleSchema,
  getScheduleByIdSchema,
  updateScheduleSchema,
} from "../schemas/schedule.schema";

const router = Router();

router.get(
  "/",
  authenticate(),
  authorize(["ADMIN"]),
  ScheduleController.getSchedules
);

router.get(
  "/:id",
  authenticate(),
  validate(getScheduleByIdSchema),
  ScheduleController.getSchedule
);

router.post(
  "/create/:id",
  authenticate(),
  validate(createScheduleSchema),
  ScheduleController.create
);

router.put(
  "/update/:id",
  authenticate(),
  validate(updateScheduleSchema),
  ScheduleController.update
);

router.delete(
  "/delete/:id",
  authenticate(),
  validate(deleteScheduleSchema),
  ScheduleController.delete
);

export { router as ScheduleRoutes };
