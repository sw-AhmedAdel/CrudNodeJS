import mongoose, { Schema } from "mongoose";
import optionsGeneratorUtil from "../utils/options-generator.util";
const departmentSchema = new Schema({
    departmentName: {
        unique:true,
        type: String,
        options: optionsGeneratorUtil("department name", {
            placeholder: "ex : development",
            validation: {
                min: 2,
                max: 15,
            },
        }),
    },
    managerName: {
        type: String,
        options: optionsGeneratorUtil("manager name", {
            placeholder: "ex : ameen",
            validation: {
                min: 3,
                max: 30,
            },
        }),
    },
    employeesNumber: {
        type: Number,
        validate: {
            validator: function (val: number) {
              return new String(val).length <= 3;
            },
            message: ({ value }) => `${value} isn't valid!`,
          },
        options: optionsGeneratorUtil("number of employees", {
            placeholder: "ex : 5",
            controlType: "number",
            validation: { length: 3 },
        }),
    },
});
export default mongoose.model("Department", departmentSchema);
