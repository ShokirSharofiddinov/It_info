const { Router } = require("express");
const {
  addAuthor,
  getAuthors,
  getAuthorsById,
  loginAuthor,
} = require("../controllers/author.controller");

const authorPolice = require("../middleware/authorPolice")

const router = Router();
router.get("/", authorPolice ,getAuthors);
router.post("/", addAuthor);
router.get("/:id", getAuthorsById);
router.post("/login", loginAuthor);

module.exports = router;
