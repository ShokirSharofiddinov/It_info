const { Router } = require("express");
const { getUsers, addUser, getUserById, loginUser, logoutUser } = require("../controllers/user.controller");

const router = Router();
router.get("/", getUsers);
router.post("/", addUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.post("/logout", logoutUser)

module.exports = router;
