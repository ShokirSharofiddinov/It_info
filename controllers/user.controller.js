const User = require("../models/User");
const { mongoose } = require("mongoose");
const { userValidation } = require("../validation/user.validation");
const { errorHandler } = require("../helpers/error_handler");
const bcrypt = require("bcrypt");
const config = require("config");
const myJwt = require("../services/JwtService");
const uuid = require("uuid");
const mailService = require("../services/MainService");

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
    const hashedPassword = await bcrypt.hash(user_password, 7);
    const user_activation_link = uuid.v4();

    const newUser = new User({
      user_name,
      user_password: hashedPassword,
      user_email,
      user_info,
      user_photo,
      created_date,
      updated_date,
      user_is_activ,
      user_activation_link,
    });
    await newUser.save();
    await mailService.sendActivationMail(
      user_email,
      `${config.get("api_url")}/api/user/activate/${user_activation_link}`
    );


    const payload = {
      id: newUser._id,
      is_activ: newUser.user_is_activ,
      userRoles: ["READ"],
    };
    const tokens = myJwt.generateTokens(payload);
    newUser.user_token = tokens.refreshToken;
    await newUser.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send({ ...tokens, user: payload });
  } catch (error) {
    errorHandler(res, error);
  }
};

const userActivate = async (req, res) => {
  try {
    const user = await User.findOne({
      user_activation_link: req.params.link,
    });
    if (!user) {
      return res.status(400).send({ message: "Bunday user topilmadi" });
    }
    if (user.user_is_active) {
      return res.status(400).send({ message: "User already activated" });
    }
    user.user_is_active = true;
    await user.save();
    res.status(200).send({
      user_is_active: user.user_is_active,
      message: "user activated",
    });
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

    const payload = {
      id: user._id,
      is_activ: user.user_is_activ,
      userRoles: ["READ"],
    };
    const tokens = myJwt.generateTokens(payload);
    console.log(tokens);

    user.user_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send({ ...tokens });
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

const logoutUser = async (req, res) => {
  const { refreshToken } = req.cookies;
  let user;
  if (!refreshToken)
    return res.status(400).send({ message: "Token topilmadi" });
  user = await User.findOneAndUpdate(
    { user_token: refreshToken },
    { user_token: "" },
    { new: true }
  );
  if (!user) return res.status(400).send({ message: "Token topilmadi" });
  res.clearCookie("refreshToken");
  return res.status(200).send({ user });
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  deleteUser,
  loginUser,
  logoutUser,
  userActivate,
};
