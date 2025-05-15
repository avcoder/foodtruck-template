import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import utils from "./utils/utils.js";
import { router } from "./routes/router.js";
import { notFound } from "./handlers/errorHandlers.js";
import "./handlers/passport.js";

// create express app
export const app = express();

// view engine setup
app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views")); // views folder is where we keep our ejs files

// any files in public/ will be served as is (ex: images, css )
app.use(express.static(path.join(__dirname, "public"))); // public folder is where we keep our static files

// Bootstrap
app.use("/css", express.static(path.join(__dirname, "node_modules/bootswatch/dist/sketchy")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

// takes raw requests and sticks them onto req.body
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logging middleware
app.use(cookieParser()); // cookie parsing middleware

// session middleware
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    key: process.env.PASSPORT_COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONN, // store session in mongoDB (not in memory)
    }),
  })
);

app.use(passport.initialize()); // passport middleware
app.use(passport.session()); // persistent login sessions

app.use((req, res, next) => {
  res.locals.u = utils;
  res.locals.currentPath = req.path; // current path
  res.locals.user = req.user; // user object
  next();
});

app.use("/", router);

app.use(notFound);
