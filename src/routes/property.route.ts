import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/user.middleware";
import {
  createPropertySchema,
  deletePropertySchema,
  getPropertyByIdSchema,
  updatePropertySchema,
} from "../schemas/property.schema";
import { PropertyController } from "../controllers/property.controller";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get("/", PropertyController.getProperties);

router.get(
  "/:id",
  validate(getPropertyByIdSchema),
  PropertyController.getProperty
);

router.post(
  "/create",
  authenticate(),
  authorize(["OWNER", "ADMIN"]),
  validate(createPropertySchema),
  PropertyController.create
);

router.put(
  "/update/:id",
  authenticate(),
  authorize(["OWNER", "ADMIN"]),
  validate(updatePropertySchema),
  PropertyController.update
);

router.delete(
  "/delete/:id",
  authenticate(),
  authorize(["OWNER", "ADMIN"]),
  validate(deletePropertySchema),
  PropertyController.delete
);
export { router as PropertyRoutes };
