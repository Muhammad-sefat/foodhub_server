import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = Router();

router.post("/", auth(UserRole.CUSTOMER), OrderController.createOrder);
router.get("/", auth(UserRole.CUSTOMER), OrderController.getMyOrders);
router.get("/:id", auth(UserRole.CUSTOMER), OrderController.getOrderById);

export const orderRoutes: Router = router;
