import { prisma } from "../../lib/prisma";

const createMeal = async (data: {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  providerId: string;
}) => {
  return prisma.meal.create({ data });
};

const getMeals = async (categoryId?: string) => {
  return prisma.meal.findMany({
    where: categoryId ? { categoryId } : {},
    include: {
      category: true,
      provider: {
        select: { restaurant: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getMealById = async (id: string) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: true,
      reviews: true,
    },
  });
};

const updateMeal = async (mealId: string, providerId: string, data: any) => {
  return prisma.meal.updateMany({
    where: { id: mealId, providerId },
    data,
  });
};

const deleteMeal = async (mealId: string, providerId: string) => {
  return prisma.meal.deleteMany({
    where: { id: mealId, providerId },
  });
};

const getMealsByProvider = async (providerId: string) => {
  return prisma.meal.findMany({
    where: { providerId },
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const MealService = {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getMealsByProvider,
};
