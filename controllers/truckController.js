import truckHandler from "../handlers/truckHandler.js";

const addTruck = (req, res) => {
  res.render("addTruck", { title: "Add Truck" });
};

const createTruck = async (req, res) => {
  const truckData = req.body;
  await truckHandler.createTruck(truckData);
  res.redirect("/");
};

export default {
  addTruck,
  createTruck,
};
