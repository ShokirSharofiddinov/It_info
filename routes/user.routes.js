const { Router } = require("express");
const { getUsers, addUser, getUserById } = require("../controllers/user.controller");

const router = Router();
router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUserById);

module.exports = router;
