var db = require("../models");

    // !!THIS ARRAY TO BE DELETED ONCE SQL DATABASE IS SET UP!!
    // !!USE ONLY FOR TESTING PURPOSES!!
    var dummyPantryData = [
      {
        id:"2",
        name:"egg",
        createdAt: "2020-01-16T22:36:17.000Z",
        updatedAt: "2020-01-16T22:36:17.000Z"
      },
      {
        id:"4",
        name:"milk",
        createdAt: "2020-01-16T22:36:17.000Z",
        updatedAt: "2020-01-16T22:36:17.000Z"
      },
      {
        id:"7",
        name:"flour",
        createdAt: "2020-01-16T22:36:17.000Z",
        updatedAt: "2020-01-16T22:36:17.000Z"
      },
      {
        id:"9",
        name:"apple juice",
        createdAt: "2020-01-16T22:36:17.000Z",
        updatedAt: "2020-01-16T22:36:17.000Z"
      },
      {
        id:"10",
        name:"butter",
        createdAt: "2020-01-16T22:36:17.000Z",
        updatedAt: "2020-01-16T22:36:17.000Z"
      },
      {
        id:"12",
        name:"broccoli",
        createdAt: "2020-01-16T22:36:17.000Z",
        updatedAt: "2020-01-16T22:36:17.000Z"
      }
    ]

module.exports = function (app) {

  // This is the route to log in the user.
  app.get("/login", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.render('index', { title: "Login", dbUsers });
    });
  });

  // This route should display all ingredients of the user
  app.get("/pantry/manage", function (req, res) {
    res.render('pantry', { title: "Pantry", dummyPantryData });
  });

  // This route should display recipes that the user currently has in their database
  app.get("/recipes", function (req, res) {
    res.render('recipes', { title: "Recipes" });
  });

  // this route should update the quantity of an ingredient item in the database
  app.put("/pantry/ingredient/update", function(req, res){
    var itemId = req.body.ingredientId;
    console.log("Updating quantity of itemId: " + itemId);
    setTimeout(function() {
      res.send({redirect: "/pantry/manage"});
    }, 1000);
  });

  // this route should remove an ingredient item in the database
  app.delete("/pantry/ingredient/remove", function(req, res){
    var itemId = req.body.ingredientId;
    console.log("Removing itemId: " + itemId );
    setTimeout(function() {
      res.send({redirect: "/pantry/manage"});
    }, 1000);
  });
};
