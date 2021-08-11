import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import personRoutes from "./routes/person.js";

const app = express();
dotenv.config();

// define data base url and port to connect
const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(bodyParser.json());

// define route for person
app.use("/person", personRoutes);

// connect to data base and connect server
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("app works on port 5000")))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
