import { Router, type Router as ExpressRouter } from "express";
import { registerUser } from "./auth.controller";

const router: ExpressRouter = Router();

router.post("/auth/register", registerUser);

export const authRoutes: ExpressRouter = router;
