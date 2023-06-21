const { Router } = require("express");
const {
  addAuthor,
  getAuthors,
  getAuthorsById,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
  deleteAuthor,
} = require("../controllers/author.controller");

const Validator = require("../middleware/validator");
const authorPolice = require("../middleware/authorPolice");
const authorRolesPolice = require("../middleware/authorRolesPolice");

const router = Router();
router.get("/", authorPolice, getAuthors);
router.get(
  "/:id",
  authorRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]),
  getAuthorsById
);
router.post("/", Validator("author"), addAuthor);
router.post("/login", Validator("author_email_pass"), loginAuthor);
router.post("/logout", logoutAuthor);
router.post("/refresh", refreshAuthorToken);
router.get("/activate/:link", authorActivate);
router.delete("/:id",authorPolice,deleteAuthor)

module.exports = router;
