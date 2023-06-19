const { Router } = require("express");
const express = require("express");
express.Router.prefix = function (path, subRouter) {
  const router = express.Router();
  this.use(path, router);
  subRouter(router);
  return router;
};
const router = Router();

const dictRouter = require("./dictionary.routes");
const categoryRouter = require("./category.routes");
const descRouter = require("./description.routes");
const synonymRouter = require("./synonym.routes");
const author = require("./author.routes");
const user = require("./user.routes");
const admin = require("./admin.routes");

router.prefix("/api", (router) => {
  router.use("/dictionary", dictRouter);
  router.use("/category", categoryRouter);
  router.use("/description", descRouter);
  router.use("/synonym", synonymRouter);
  router.use("/author", author);
  router.use("/user", user);
  router.use("/admin", admin);
});

module.exports = router;
