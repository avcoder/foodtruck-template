import { Router } from "express";
import truckController from "../controllers/truckController.js";

export const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "🚚 Welcome to Food Truck",
  });
});

router.get("/add", truckController.addTruck);
router.post("/add", truckController.createTruck);
