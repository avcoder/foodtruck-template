import { Router } from "express";
import truckController from "../controllers/truckController.js";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

export const router = Router();

router.get("/", catchErrors(truckController.homePage));

router.get(
  "/trucks",
  authController.isAuthenticated,
  catchErrors(truckController.getTrucks)
);

// ADD TRUCK
router.get(
  "/add",
  authController.isAuthenticated,
  catchErrors(truckController.addTruck)
);
router.post(
  "/add",
  truckController.upload,
  catchErrors(truckController.resize),
  catchErrors(truckController.createTruck)
);

// EDIT TRUCK
router.get(
  "/trucks/:id/edit",
  authController.isAuthenticated,
  truckController.editTruck
);
router.post(
  "/trucks/:id/edit",
  authController.isAuthenticated,
  catchErrors(truckController.updateTruck)
);

// DELETE TRUCK
router.delete(
  "/trucks/:id",
  authController.isAuthenticated,
  catchErrors(truckController.deleteTruck)
);

// FOOD TRUCK (From slug)
router.get("/foodtruck/:slug", catchErrors(truckController.getTruckBySlug));

// REGISTER, LOGIN & LOGOUT
router.get("/register", userController.registerForm);
router.post(
  "/register",
  userController.validateRegister,
  userController.register
);
router.get("/login", userController.loginForm);
router.post("/login", authController.login);
router.get("/logout", authController.isAuthenticated, authController.logout);
