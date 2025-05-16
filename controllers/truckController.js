import truckHandler from "../handlers/truckHandler.js";

const homePage = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("home", { title: "Welcome to FoodTrucks", trucks });
};

const addTruck = async (req, res) => {
  res.render("addTruck", { title: "Add Truck", choices: [
      "Cash only",
      "Debit only",
      "Online ordering",
      "Corporate lunches",
      "Vegetarian",
    ], });
};

const createTruck = async (req, res) => {
  const truckData = req.body;
  await truckHandler.createTruck(truckData);
  res.redirect("/");
};

const getTrucks = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("trucks", { title: "All Trucks", trucks });
};

export default {
  addTruck,
  createTruck,
  getTrucks,
  homePage,
};
