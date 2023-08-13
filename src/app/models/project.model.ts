import mongoose, { Schema } from "mongoose";
import optionsGeneratorUtil from "../utils/options-generator.util";
const projectSchema = new Schema({
    projectName: {
        type: String,
        unique:true,
        options: optionsGeneratorUtil("project name", {
            placeholder: "ex : crud",
            validation: {
                min: 2,
                max: 15,
            },
        }),
    },
    projectManagerName: {
        type: String,
        options: optionsGeneratorUtil("manager name", {
            placeholder: "ex : ameen",
            validation: {
                min: 3,
                max: 15,
            },
        }),
    },
    employeesNumber: {
        type: Number,
        options: optionsGeneratorUtil("number of employees", {
            placeholder: "ex : 5",
            controlType: "number",
            validation: { length: 3 },
        }),
    },
});
export default mongoose.model("project", projectSchema);
