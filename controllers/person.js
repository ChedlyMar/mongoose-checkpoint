import Person from "../models/person.js";
import mongoose from "mongoose";

//    1-  Create and Save a Record of a Model:
export const createPerson = async (req, res) => {
  const person = req.body;
  const newPerson = new Person(person);
  try {
    await newPerson.save();

    res.status(200).json(newPerson);
  } catch (error) {
    res.satatus(409).json({ message: error.message });
  }
};

//    2-  Create Many Records with model.create()
export const createArrayOfPerson = async (req, res) => {
  const arrayOfPerson = req.body;
  try {
    const createdPerson = await Person.create(arrayOfPerson);
    res.status(200).json(createdPerson);
  } catch (error) {
    res.satatus(409).json({ message: error.message });
  }
};

//    3-  Use model.find() to Search Your Database
export const getPersons = async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.satatus(404).json({ message: error.message });
  }
};

//    4-  Use model.findOne() to Return a Single Matching Document from Your Database
//    5-  Use model.findById() to Search Your Database By _id
export const getPersonBy = async (req, res) => {
  const { findWith } = req.params;
  // find by ID
  if (mongoose.Types.ObjectId.isValid(findWith)) {
    const person = await Person.findById(findWith);

    res.status(200).json(person);
  }
  // find by favourit food
  else {
    const person = await Person.findOne({ favoriteFoods: findWith });

    res.status(200).json(person);
  }
};

//    6-  Perform Classic Updates by Running Find, Edit, then Save
//    7-  Perform New Updates on a Document Using model.findOneAndUpdate()
export const updatePersonFood = async (req, res) => {
  const { id } = req.params;
  const { food } = req.body;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      //find person
      const person = await Person.findById(id);
      //update food list
      person.favoriteFoods.push(food);
      //save update
      await person.save({ new: true });
      //send response
      res.status(200).json(person);
    } else {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: id },
        { $addToSet: { favoriteFoods: food } },
        { new: true }
      );
      res.json(updatedPerson);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//    8-  Delete One Document Using model.findByIdAndRemove
//    9-  MongoDB and Mongoose - Delete Many Documents with model.remove()
export const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Person.findByIdAndRemove(id);
      res.status(200).json("deleted");
    } else {
      await Person.remove({ name: id });

      res.status(200).json("deleted");
    }
  } catch (error) {
    res.json({ mssage: error.message });
  }
};

//    10- Chain Search Query Helpers to Narrow Search Results
export const findPeopleBoritos = async (req, res) => {
  try {
    const peopleLikeBoritos = await Person.find({
      favoriteFoods: "burritos",
    })
      .sort({ name: -1 })
      .limit(1)
      .select({ name: 1, favoriteFoods: 1 });
    res.json(peopleLikeBoritos);
  } catch (error) {}
};
