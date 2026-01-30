import { prisma } from "../../lib/prisma";
const createReview = async (
  userId: string,
  mealId: string,
  rating: number,
  comment?: string,
) => {
  // check delivered order
  const deliveredOrder = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: "DELIVERED",
      items: {
        some: {
          mealId,
        },
      },
    },
  });

  if (!deliveredOrder) {
    throw new Error("You can review only delivered meals");
  }

  // prevent duplicate review
  const existingReview = await prisma.review.findFirst({
    where: {
      userId,
      mealId,
    },
  });

  if (existingReview) {
    throw new Error("You already reviewed this meal");
  }

  return prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment: comment ?? null,
    },
  });
};

export const ReviewService = { createReview };
