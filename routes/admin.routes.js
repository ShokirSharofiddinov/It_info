const { Router } = require("express");
const { deleteAdmin, getAdmins, addAdmin, getAdminById, loginAdmin } = require("../controllers/admin.controller");

const router = Router();
router.get("/", getAdmins);
router.post("/", addAdmin);
router.post("/login", loginAdmin);
router.get("/:id", getAdminById);
router.delete("/:id", deleteAdmin)

module.exports = router;
