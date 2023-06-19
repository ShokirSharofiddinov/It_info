const Joi = require("joi");

const admin_check_login = Joi.object({
  admin_email: Joi.string().email().message("Invalid email").required(),
  admin_password: Joi.string().min(6).max(30).required(),
});

module.exports = admin_check_login;
