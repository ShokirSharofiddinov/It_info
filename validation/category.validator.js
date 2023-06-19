const Joi = require("joi");

const categorySchema = Joi.object({
  category_name: Joi.string()
    .min(2)
    .message("Kategory nomi 2 ta harifdan kam bo'lmasligi kerak!")
    .max(255)
    .message("Kategory nomi 255 ta harifdan uzun bo'lmasligi kerak!")
    .required(),
  parent_category_id: Joi.string().alphanum(),
});

module.exports = categorySchema;
