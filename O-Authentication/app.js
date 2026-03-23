import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import connectDB from "./config/db.js";
import HttpError from "./middleware/HttpError.js";
import OauthRouter from "./router/OauthRouter.js";
import passport from "./config/passport.js";
import session from "express-session";
import profileRoute from "./router/profileRoute.js";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", OauthRouter);
app.use("/profile", profileRoute);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

async function startServer() {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
