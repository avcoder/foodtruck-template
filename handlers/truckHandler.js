import Truck from "../models/truckModel.js";

const createTruck = async (truckData) => {
  console.log("Truck data in handler: ", truckData);
  return await Truck.create(truckData);
};

export default {
  createTruck,
};
