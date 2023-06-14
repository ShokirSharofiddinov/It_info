const { Router } = require("express");
const { deleteAdmin, getAdmins, addAdmin, getAdminById } = require("../controllers/admin.controller");

const router = Router();
router.get("/", getAdmins);
router.post("/", addAdmin);
router.get("/:id", getAdminById);
router.delete("/:id", deleteAdmin)
module.exports = router;
