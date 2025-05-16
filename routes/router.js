import { Router } from "express";
import truckController from "../controllers/truckController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

export const router = Router();

router.get("/", catchErrors(truckController.homePage));

router.get("/trucks", catchErrors(truckController.getTrucks));

router.get("/add", catchErrors(truckController.addTruck));
router.post("/add", catchErrors(truckController.createTruck));
