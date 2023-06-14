const { Router } = require("express");
const { getUsers, addUser, getUserById, loginUser } = require("../controllers/user.controller");

const router = Router();
router.get("/", getUsers);
router.post("/", addUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);

module.exports = router;
