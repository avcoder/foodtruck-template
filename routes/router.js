import { Router } from "express";
import truckController from "../controllers/truckController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

export const router = Router();

router.get("/", catchErrors(truckController.homePage));

router.get("/trucks", catchErrors(truckController.getTrucks));

// ADD TRUCK
router.get("/add", catchErrors(truckController.addTruck));
router.post(
  "/add",
  truckController.upload,
  catchErrors(truckController.resize),
  catchErrors(truckController.createTruck)
);

// EDIT TRUCK
router.get("/trucks/:id/edit", truckController.editTruck);
router.post("/trucks/:id/edit", catchErrors(truckController.updateTruck));

// DELETE TRUCK
router.delete("/trucks/:id", catchErrors(truckController.deleteTruck));

// FOOD TRUCK (From slug)
router.get("/foodtruck/:slug", catchErrors(truckController.getTruckBySlug))
