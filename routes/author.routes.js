const { Router } = require("express");
const {
  createAuthor,
  getAuthors,
  getAuthorsById,
  loginAuthor,
} = require("../controllers/author.controller");

const router = Router();
router.get("/", getAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorsById);
router.post("/login", loginAuthor)

module.exports = router;
