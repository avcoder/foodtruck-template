import Truck from "../models/truckModel.js";

const createTruck = async (truckData) => {
  console.log("Truck data in handler: ", truckData);
  return await Truck.create(truckData);
};

const getOneTruck = async ({ id }) => {
  return await Truck.findOne({ _id: id }).lean();
};

const getAllTrucks = async () => {
  return await Truck.find().lean();
};

const updateTruck = async (id, truckData) => {
  return await Truck.findOneAndUpdate({ _id: id }, truckData, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteTruck = async (id) => {
  return await Truck.findByIdAndDelete(id).lean();
};

const getOneTruckBySlug = async ({ slug }) => {
  return await Truck.findOne({ slug }).lean()
}

export default {
  createTruck,
  getAllTrucks,
  updateTruck,
  getOneTruck,
  deleteTruck,
  getOneTruckBySlug,
};
