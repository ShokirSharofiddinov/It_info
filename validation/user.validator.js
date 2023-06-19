const Joi = require("joi");

const userSchema = Joi.object({
  user_name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),

  user_email: Joi.string().email(),
  user_phone: Joi.string().pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
  user_password: Joi.string().min(6).max(20),
  user_info: Joi.string(),
  user_photo: Joi.string().default("/user/avatar.jpg"),
  created_date: Joi.string(),
  updated_date: Joi.string(),
  user_id_activ: Joi.boolean().default(false),
});

module.exports = userSchema