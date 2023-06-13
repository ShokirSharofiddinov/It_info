const { Router } = require("express");
const {
  createAuthor,
  getAuthors,
  getAuthorsById,
} = require("../controllers/author.controller");

const router = Router();
router.get("/", getAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorsById);

module.exports = router;
