import { Request, Response } from "express";
import { ReviewService } from "./review.service";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { mealId, rating, comment } = req.body;

    if (!mealId || !rating) {
      return res.status(400).json({
        message: "MealId and rating are required",
      });
    }

    const review = await ReviewService.createReview(
      req.user!.id,
      mealId,
      rating,
      comment,
    );

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to create review",
    });
  }
};
