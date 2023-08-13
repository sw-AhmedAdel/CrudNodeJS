import Joi from "joi";
const mongoIdSchema = Joi.string().length(24).hex().required();
const fileSchema = Joi.binary().min(1).max(5242880).required();
export { mongoIdSchema, fileSchema };
