import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ProviderController } from "./provider.controller";

const router = Router();

// PUBLIC
router.get("/providers", ProviderController.getProviders);
router.get("/providers/:id", ProviderController.getProvider);

// PROVIDER
router.post(
  "/provider/profile",
  auth(UserRole.PROVIDER),
  ProviderController.createProfile,
);

router.get(
  "/provider/dashboard",
  auth(UserRole.PROVIDER),
  ProviderController.getMyProfile,
);

router.get(
  "/provider/orders",
  auth(UserRole.PROVIDER),
  ProviderController.getOrders,
);

router.patch(
  "/provider/orders/:id",
  auth(UserRole.PROVIDER),
  ProviderController.updateOrderStatus,
);

export const providerRoutes: Router = router;
