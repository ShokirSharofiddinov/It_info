const Joi = require("joi");

exports.categoryValidation = (data) => {
  const schema = Joi.object({
    category_name: Joi.string()
      .min(2)
      .message("Kategory nomi 2 ta harifdan kam bo'lmaligi kerak!")
      .max(255)
      .message("Kategory nomi 255 ta harifdan uzun bo'lmasligi kerak!")
      .required(),
    parent_category_id: Joi.string().alphanum(),
  });

  return schema.validate(data, { abortEarly: false });
};
