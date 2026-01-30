import { Request, Response } from "express";
import { MealService } from "./meal.service";
import { prisma } from "../../lib/prisma";

// create meal
const createMeal = async (req: Request, res: Response) => {
  try {
    const { title, description, price, imageUrl, categoryId } = req.body;

    if (!title || !price || !categoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: req.user!.id },
    });

    if (!providerProfile) {
      return res.status(403).json({ message: "Provider profile not found" });
    }

    const meal = await MealService.createMeal({
      title,
      description,
      price,
      imageUrl,
      categoryId,
      providerId: providerProfile.id,
    });

    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create meal" });
  }
};

// get all meals (optional category filter)
const getMeals = async (req: Request, res: Response) => {
  try {
    const meals = await MealService.getMeals(
      req.query.categoryId as string | undefined,
    );
    res.json({ success: true, data: meals });
  } catch {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
};

// get meal details
const getMeal = async (req: Request, res: Response) => {
  const meal = await MealService.getMealById(req.params.id as string);

  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  res.json({ success: true, data: meal });
};

// update own meal
const updateMeal = async (req: Request, res: Response) => {
  const result = await MealService.updateMeal(
    req.params.id as string,
    req.user!.id,
    req.body,
  );

  if (result.count === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.json({ success: true });
};

// delete own meal
const deleteMeal = async (req: Request, res: Response) => {
  const result = await MealService.deleteMeal(
    req.params.id as string,
    req.user!.id,
  );

  if (result.count === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.json({ success: true });
};

export const MealController = {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
};
