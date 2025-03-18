import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validate } from "../middlewares/user.middleware";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
  userLoginSchema,
} from "../schemas/user.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", UserController.getUsers);
router.get("/:id", validate(getUserByIdSchema), UserController.getUser);
router.post("/register", validate(createUserSchema), UserController.register);
router.post("/user-login", validate(userLoginSchema), UserController.login);
router.put(
  "/update-user",
  authenticate(),
  validate(updateUserSchema),
  UserController.update
);
router.delete("/delete-user", authenticate(), UserController.delete);

export { router as UserRoutes };
