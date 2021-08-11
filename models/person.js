import mongoose from "mongoose";

// define person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: Number,
  favoriteFoods: [String],
});

// create person model
const Person = mongoose.model("Person", personSchema);

export default Person;
