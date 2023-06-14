const User = require("../models/User");
const { mongoose } = require("mongoose");
const {userValidation} = require("../validation/user.validation");
const { errorHandler } = require("../helpers/error_handler");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }
    const {
      user_name,
      user_password,
      user_email,
      user_info,
      user_photo,
      created_date,
      updated_date,
      user_is_activ,
    } = value;
    const user = await User.findOne({
      user_name: { $regex: user_email, $options: "i" },
    });
    if (user) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(user_password, 7);
    const newUser = new User({
      user_name,
      user_password: hashedPassword,
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

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.findOne({ user_email });
    if (!user)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(user_password, user.user_password);
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });

    res.status(200).send({ message: "Tizimga hush kelibsiz" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
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
  loginUser,
};
