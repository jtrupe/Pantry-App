var db = require("../models");

module.exports = function (app) {
  app.post("/api/user/create", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      const userId = dbUser.dataValues.id.toString();
      res.send(userId);
    });
  });
};
