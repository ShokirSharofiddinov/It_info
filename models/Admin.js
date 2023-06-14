const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    admin_name: {
      type: String,
      required: true,
      trim: true,
    },
    admin_password: {
      type: String,
    },
    admin_email: {
      type: String,
      required: true,
      unique: true,
    },
    created_date: {
      type: Date,
    },
    updated_date: {
      type: Date,
    },
    admin_is_activ: {
      type: Boolean,
    },
    admin_iscreator: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Admin", adminSchema);
