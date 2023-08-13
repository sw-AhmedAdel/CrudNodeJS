import mongoose, { Schema } from "mongoose";
import optionsGeneratorUtil from "../utils/options-generator.util";
const userSchema = new Schema({
  image: {
    type: String,
    options: optionsGeneratorUtil("profile image", {
      type: "file",
      controlType: "file",
    }),
  },
  firstName: {
    type: String,
    options: optionsGeneratorUtil("first name", {
      placeholder: "ex : mahmoud",
      validation: {
        min: 3,
        max: 10,
      },
    }),
  },
  middleName: {
    type: String,
    options: optionsGeneratorUtil("middle name", {
      placeholder: "ex : fady",
      validation: {
        min: 3,
        max: 10,
      },
    }),
  },
  thirdName: {
    type: String,
    options: optionsGeneratorUtil("third name", {
      placeholder: "ex : ameen",
      validation: {
        min: 3,
        max: 10,
      },
    }),
  },
  email: {
    type: String,
    unique: true,
    options: optionsGeneratorUtil("user email", {
      placeholder: "ex : xyz@ex.com",
      controlType: "email",
    }),
  },
  ssn: {
    type: Number,
    unique: true,
    validate: {
      validator: function (val: number) {
        return new String(val).length == 14;
      },
      message: ({ value }) => `${value} isn't valid!`,
    },
    options: optionsGeneratorUtil("national id", {
      placeholder: "ex : 12345678912345",
      controlType: "number",
      validation: { length: 14 },
    }),
  },
  birthDate: {
    type: Date,
    options: optionsGeneratorUtil("birth date", {
      placeholder: "ex : 20/5/2023",
      controlType: "date",
    }),
  },
  address: {
    type: String,
    options: optionsGeneratorUtil("address", {
      placeholder: "ex : abasia , cairo , egypt",
      validation: { min: 8 },
    }),
  },
  gender: {
    type: String,
    options: optionsGeneratorUtil("gender", {
      placeholder: "ex : male",
      controlType: "radio",
      values: ["male", "female"],
      validation: {
        valid: ["male", "female"],
      },
    }),
  },
});
export default mongoose.model("User", userSchema);
