const Joi = require("joi");

exports.adminValidation = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),

    admin_email: Joi.string().email(),
    admin_password: Joi.string().min(6).max(20),
    created_date: Joi.string(),
    updated_date: Joi.string(),
    admin_is_creator: Joi.boolean().default(false),
    admin_is_activ: Joi.boolean().default(false),
  });

  return schema.validate(data, { abortEarly: false });
};
