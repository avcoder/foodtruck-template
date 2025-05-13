import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "🚚 Welcome to Food Truck",
  });
});
