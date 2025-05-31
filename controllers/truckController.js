import truckHandler from "../handlers/truckHandler.js";
import multer from "multer";
import { Jimp } from "jimp";
import { v4 as uuidv4 } from "uuid";
import sanitize from "sanitize-html";

const CHOICES = [
  "Cash only",
  "Debit only",
  "Online ordering",
  "Corporate lunches",
  "Vegetarian",
];

const homePage = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("home", { title: "Welcome to FoodTrucks", trucks });
};

const addTruck = async (req, res) => {
  res.render("addTruck", {
    title: "Add Truck",
    choices: CHOICES,
  });
};

const createTruck = async (req, res) => {
  const truckData = req.body;
  truckData.name = sanitize(truckData.name, {
    allowedTags: [],
    allowedAttributes: {},
  });
  console.log("truckData: ", truckData);
  const truck = await truckHandler.createTruck(truckData);
  req.flash("success", `/${truck.slug} added successfully!`);
  // res.redirect(`/foodtruck/${truck.slug}`);
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

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith("image/");

    if (isPhoto) {
      next(null, true); // it's fine continue on, no error here
    } else {
      next({ message: "⚠️ That file type isn't allowed" }, false);
    }
  },
};

const upload = multer(multerOptions).single("photo");

const resize = async (req, res, next) => {
  // check if there is a file, and if there isn't call next
  if (!req.file) {
    return next(); // skip to the next middleware
  }

  // image/png = ['image', 'png']
  const extension = req.file.mimetype.split("/")[1];

  req.body.photo = `${uuidv4()}.${extension}`;
  console.log("buffer ", req.file.buffer);
  const photo = await Jimp.read(req.file.buffer);
  await photo.write(`./public/uploads/${req.body.photo}`); // saves the image in uploads
  next();
};

const getTruckBySlug = async (req, res, next) => {
  const truck = await truckHandler.getOneTruckBySlug({ slug: req.params.slug });

  if (!truck) return next();

  res.render("foodtruck", { title: `${truck.name}`, truck });
};

export default {
  addTruck,
  createTruck,
  getTrucks,
  homePage,
  updateTruck,
  editTruck,
  deleteTruck,
  upload,
  resize,
  getTruckBySlug,
};
