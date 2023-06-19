const { Router } = require("express");
const {
  getUsers,
  addUser,
  getUserById,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const Validator = require("../middleware/validator");

const router = Router();
router.get("/", getUsers);
router.post("/", Validator("user"), addUser);
router.post("/login", Validator("user_check_login"), loginUser);
router.get("/:id", getUserById);
router.post("/logout", logoutUser);

module.exports = router;
