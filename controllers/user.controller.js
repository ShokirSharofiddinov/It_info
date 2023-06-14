const errorHandler = require("../helpers/error_handler");
const User = require("../models/User");
const { mongoose } = require("mongoose");

const addUser = async (req, res) => {
  try {
    const {
      user_name,
      user_password,
      user_email,
      user_info,
      user_photo,
      created_date,
      updated_date,
      user_is_activ,
    } = req.body;
    const user = await User.findOne({
      user_name: { $regex: user_email, $options: "i" },
    });
    if (user) {
      return res.status(400).json({ message: "email already exists" });
    }
    const newUser = new User({
      user_name,
      user_password,
      user_email,
      user_info,
      user_photo,
      created_date,
      updated_date,
      user_is_activ,
    });
    newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find({})
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid id",
      });
    }
    const user = await User.findOne(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};


const deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid id",
      });
    }
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  addUser,
  getUsers,
  getUserById,
  deleteUser,
};
