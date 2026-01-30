import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { createReview } from "./review.controller";

const router = Router();

router.post("/", auth(UserRole.CUSTOMER), createReview);

export const reviewRoutes: Router = router;
