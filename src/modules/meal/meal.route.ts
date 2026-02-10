import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { MealController } from "./meal.controller";

const router = Router();

// PUBLIC
router.get("/meals", MealController.getMeals);
router.get("/meals/:id", MealController.getMeal);

// PROVIDER
router.post(
  "/provider/meals",
  auth(UserRole.PROVIDER),
  MealController.createMeal,
);

router.get(
  "/provider/meals",
  auth(UserRole.PROVIDER),
  MealController.getMyMeals,
);
router.put(
  "/provider/meals/:id",
  auth(UserRole.PROVIDER),
  MealController.updateMeal,
);

router.delete(
  "/provider/meals/:id",
  auth(UserRole.PROVIDER),
  MealController.deleteMeal,
);

export const mealRoutes: Router = router;
