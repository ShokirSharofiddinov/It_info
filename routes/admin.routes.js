const { Router } = require("express");
const {
  deleteAdmin,
  getAdmins,
  addAdmin,
  getAdminById,
  loginAdmin,
} = require("../controllers/admin.controller");
const adminPolice = require("../middleware/adminPolice");
const adminRolesPolice = require("../middleware/adminRolesPolice");
const { deleteUser, addUser } = require("../controllers/user.controller");
const {
  deleteAuthor,
  addAuthor,
  getAuthors,
} = require("../controllers/author.controller");
const {
  deleteCategory,
  addCategory,
  getCategories,
} = require("../controllers/category.controller");
const {
  deleteDesc,
  addDesc,
  getDesc,
} = require("../controllers/description.controller");
const {
  deleteDict,
  addDict,
  getDict,
} = require("../controllers/dictionary.controller");
const { deleteSynonym, addSyn } = require("../controllers/synonym.contoller");

const router = Router();
router.get("/", adminPolice, getAdmins);
router.post("/", addAdmin);

router.post("/login", loginAdmin);
router.get(
  "/:id",
  adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]),
  getAdminById
);
router.delete("/:id", deleteAdmin);
router.delete("/user/:id", deleteUser);
router.delete("/author/:id", deleteAuthor);
router.delete("/category/:id", deleteCategory);
router.delete("/des/:id", deleteDesc);
router.delete("/dic/:id", deleteDict);
router.delete("/syn/:id", deleteSynonym);
router.post("/user", addUser);
router.post("/author", addAuthor);
router.post("/category", addCategory);
router.post("/des", addDesc);
router.post("/dic", addDict);
router.post("/syn", addSyn);

module.exports = router;
