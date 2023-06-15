const { Router } = require("express");
const {
  addAuthor,
  getAuthors,
  getAuthorsById,
  loginAuthor,
} = require("../controllers/author.controller");

const authorPolice = require("../middleware/authorPolice");
const authorRolesPolice = require("../middleware/authorRolesPolice");

const router = Router();
router.get("/", authorPolice, getAuthors);
router.get("/:id", authorRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), getAuthorsById);
router.post("/", addAuthor);
router.post("/login", loginAuthor);

module.exports = router;
