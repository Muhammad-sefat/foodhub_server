import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/users", auth(UserRole.ADMIN), AdminController.getAllUsers);
router.patch(
  "/users/:id",
  auth(UserRole.ADMIN),
  AdminController.updateUserStatus,
);
router.get("/orders", auth(UserRole.ADMIN), AdminController.getAllOrders);

export const adminRoutes: Router = router;
