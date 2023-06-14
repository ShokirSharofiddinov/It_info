const { Router } = require("express");
const {
  getCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryByName,
} = require("../controllers/category.controller");

const router = Router();
router.get("/", getCategories);
router.post("/", addCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/name/:name", getCategoryByName);

module.exports = router;
