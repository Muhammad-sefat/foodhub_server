import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { categoryRoutes } from "./modules/category/category.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", categoryRoutes);

app.get("/", (_req, res) => {
  res.send("FoodHub API is running 🚀");
});

export default app;
