import truckHandler from "../handlers/truckHandler.js";

const homePage = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("home", { title: "Welcome to FoodTrucks", trucks });
};

const addTruck = async (req, res) => {
  res.render("addTruck", {
    title: "Add Truck",
    choices: [
      "Cash only",
      "Debit only",
      "Online ordering",
      "Corporate lunches",
      "Vegetarian",
    ],
  });
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

const editTruck = async (req, res) => {
  const truck = await truckHandler.getOneTruck({ id: req.params.id });
  res.render("editTruck", {
    title: `Edit ${truck.name}`,
    truck,
    tags: truck.tags,
  });
};

const updateTruck = async (req, res) => {
  const id = req.params.id;
  const truckData = req.body;
  const truck = await truckHandler.updateTruck(id, truckData);

  res.redirect(`/trucks/${truck._id}/edit`);
};

const deleteTruck = async (req, res) => {
  const id = req.params.id;
  const truck = await truckHandler.deleteTruck(id);
  res.redirect("/");
};

export default {
  addTruck,
  createTruck,
  getTrucks,
  homePage,
  updateTruck,
  editTruck,
  deleteTruck,
};
