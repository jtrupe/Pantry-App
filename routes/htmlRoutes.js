var db = require("../models");

module.exports = function (app) {
  // This is the route to log in the user.
  app.get("/login", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.render('index', { title: "Login", dbUsers });
    });
  });

  app.get("/pantry/manage", function (req, res) {
    res.render('pantry', { title: "Pantry" });
  });

  app.get("/recipes", function (req, res) {
    res.render('recipes', { title: "Recipes" });
  });

// Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
