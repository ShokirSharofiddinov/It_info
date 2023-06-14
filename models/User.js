const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_password: {
      type: String,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_info: {
      type: String,
    },
    user_photo: {
      type: String,
    },
    created_date: {
      type: Date,
    },
    updated_date: {
      type: Date,
    },
    user_is_activ: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
