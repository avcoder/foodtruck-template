import Truck from "../models/truckModel.js";

const createTruck = async (truckData) => {
  console.log("Truck data in handler: ", truckData);
  return await Truck.create(truckData);
};

const getAllTrucks = async () => {
  return await Truck.find().lean();
};

export default {
  createTruck,
  getAllTrucks
};
