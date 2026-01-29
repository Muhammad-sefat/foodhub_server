import { Router } from "express";
import * as CategoryController from "./category.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.post(
  "/admin/categories",
  auth(UserRole.ADMIN),
  CategoryController.createCategory,
);
router.get("/categories", CategoryController.getCategories);

export const categoryRoutes: Router = router;
