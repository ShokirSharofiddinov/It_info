const { Router } = require("express");
const router = Router();

const dictRouter = require("./dictionary.routes");
const categoryRouter = require("./category.routes");
const descRouter = require("./description.routes");
const synonymRouter = require("./synonym.routes");
const author = require("./author.routes")
const user = require("./user.routes")
const admin = require("./admin.routes")

router.use("/api/dictionary", dictRouter);
router.use("/api/category", categoryRouter);
router.use("/api/description", descRouter);
router.use("/api/synonym", synonymRouter);
router.use("/api/author", author)
router.use("/api/user",user)
router.use("/api/admin",admin)

module.exports = router;


