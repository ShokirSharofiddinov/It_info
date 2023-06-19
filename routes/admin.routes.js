const { Router } = require("express");
const {
  deleteAdmin,
  getAdmins,
  addAdmin,
  getAdminById,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/admin.controller");
const adminPolice = require("../middleware/adminPolice");
const adminRolesPolice = require("../middleware/adminRolesPolice");
// const { deleteUser, addUser } = require("../controllers/user.controller");
// const {
//   deleteAuthor,
//   addAuthor,
// } = require("../controllers/author.controller");
// const {
//   deleteCategory,
//   addCategory,
// } = require("../controllers/category.controller");
// const {
//   deleteDesc,
//   addDesc,
// } = require("../controllers/description.controller");
// const {
//   deleteDict,
//   addDict,
// } = require("../controllers/dictionary.controller");
// const { deleteSynonym, addSyn } = require("../controllers/synonym.contoller");

const Validator = require("../middleware/validator");

const router = Router();
router.get("/", adminPolice, getAdmins);
router.post("/", Validator("admin"), addAdmin);

router.post("/login", Validator("admin_check_login"), loginAdmin);
router.get(
  "/:id",
  adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]),
  getAdminById
);
router.delete("/:id", deleteAdmin);
router.post("/logout", logoutAdmin);

// router.delete("/user/:id", adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), deleteUser);
// router.delete("/author/:id", adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), deleteAuthor);
// router.delete("/category/:id", adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), deleteCategory);
// router.delete("/des/:id", adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), deleteDesc);
// router.delete("/dic/:id", adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), deleteDict);
// router.delete("/syn/:id",adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), deleteSynonym);
// router.post("/user", adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]),addUser);
// router.post("/author",adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), addAuthor);
// router.post("/category",adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), addCategory);
// router.post("/des",adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), addDesc);
// router.post("/dic",adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), addDict);
// router.post("/syn",adminRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]), addSyn);

module.exports = router;
