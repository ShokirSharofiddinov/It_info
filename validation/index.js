const author_email_pass = require("./author_email_pass.validator");
const author = require("./author.validator");
const category = require("./category.validator");
const user = require("./user.validator");
const admin = require("./admin.validator");
const admin_check_login = require("./admin_check_login");
const user_check_login = require("./user_check_login");

module.exports = {
  author_email_pass,
  author,
  category,
  user,
  admin,
  admin_check_login,
  user_check_login,
};
