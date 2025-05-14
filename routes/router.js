import { Router } from "express";
import truckController from "../controllers/truckController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

export const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "🚚 Welcome to Food Truck",
  });
});

router.get("/add", catchErrors(truckController.addTruck));
router.post("/add", catchErrors(truckController.createTruck));
