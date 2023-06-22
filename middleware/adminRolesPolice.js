const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(403).json({ message: "Admin ro'yhatdan o'tmagan" });
      }

      console.log(authorization);
      const bearer = authorization.split(" ")[0];
      const token = authorization.split(" ")[1];
      if (bearer != "Bearer" || !token) {
        return res
          .status(403)
          .json({ message: "Admin ro'yhatdan o'tmagan (token berilmagan)" });
      }

      const { admin_is_activ, admin_is_creatoyr } = jwt.verify(
        token,
        config.get("adminSecret")
      );

      let hasRole = false;
      admin_is_creatoyr.forEach((authorRole) => {
        if (roles.includes(authorRole)) hasRole = true;
      });

      if (!admin_is_activ || !hasRole) {
        return res
          .status(403)
          .json({ message: "Sizga bunday huquq berilmagan" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .send({ message: "Admin ro'yhatdan o'tmagan (token toto'g'ri)" });
    }
  };
};