import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { categoryRoutes } from "./modules/category/category.route";
import { mealRoutes } from "./modules/meal/meal.route";
import { providerRoutes } from "./modules/provider/provider.route";
import { orderRoutes } from "./modules/order/order.route";
import { reviewRoutes } from "./modules/review/review.route";
import { adminRoutes } from "./modules/admin/admin.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", categoryRoutes);
app.use("/api", mealRoutes);
app.use("/api", providerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.send("FoodHub API is running 🚀");
});

export default app;
