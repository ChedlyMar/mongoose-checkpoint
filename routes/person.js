import express from "express";
import {
  createPerson,
  createArrayOfPerson,
  getPersons,
  getPersonBy,
  findPeopleBoritos,
  updatePersonFood,
  deletePerson,
} from "../controllers/person.js";

const routes = express.Router();

routes.get("/burritos", findPeopleBoritos);
routes.post("/", createPerson);
routes.post("/array", createArrayOfPerson);
routes.get("/", getPersons);
routes.get("/:findWith", getPersonBy);
routes.patch("/:id", updatePersonFood);
routes.delete("/:id", deletePerson);

export default routes;
