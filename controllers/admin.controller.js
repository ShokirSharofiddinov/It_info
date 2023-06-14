const Admin = require("../models/Admin");
const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt")
const {adminValidation} = require("../validation/admin.validation");
const { errorHandler } = require("../helpers/error_handler");

const addAdmin = async (req, res) => {
  const { error, value } = adminValidation(req.body);
  if (error) {
    return res.status(404).send({ message: error.details[0].message });
  }
  try {
    const {
      admin_name,
      admin_password,
      admin_email,
      created_date,
      updated_date,
      admin_is_activ,
      admin_is_creatoyr,
    } = value;
    const admin = await Admin.findOne({
      admin_name: { $regex: admin_email, $options: "i" },
    });
    if (admin) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(admin_password, 7);

    const newAdmin = new Admin({
      admin_name,
      admin_password: hashedPassword,
      admin_email,
      created_date,
      updated_date,
      admin_is_activ,
      admin_is_creatoyr,
    });
    newAdmin.save();

    res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find({});
    if (!admin) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAdminById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid id",
      });
    }
    const admin = await Admin.findOne(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid id",
      });
    }
    const { id } = req.params;
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const admin = await Admin.findOne({ admin_email });
    if (!admin)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });

    res.status(200).send({ message: "Tizimga hush kelibsiz" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAdmin,
  getAdmins,
  getAdminById,
  deleteAdmin,
  loginAdmin
};
