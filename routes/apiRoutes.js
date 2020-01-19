var db = require("../models");
var axios = require("axios");
require("dotenv").config();

// !!THIS ARRAY TO BE DELETED ONCE SQL DATABASE IS SET UP!!
// !!USE ONLY FOR TESTING PURPOSES!!
var dummyPantryData = [
  {
    id: "2",
    name: "egg",
    createdAt: "2020-01-16T22:36:17.000Z",
    updatedAt: "2020-01-16T22:36:17.000Z"
  },
  {
    id: "4",
    name: "milk",
    createdAt: "2020-01-16T22:36:17.000Z",
    updatedAt: "2020-01-16T22:36:17.000Z"
  },
  {
    id: "7",
    name: "flour",
    createdAt: "2020-01-16T22:36:17.000Z",
    updatedAt: "2020-01-16T22:36:17.000Z"
  },
  {
    id: "9",
    name: "apple juice",
    createdAt: "2020-01-16T22:36:17.000Z",
    updatedAt: "2020-01-16T22:36:17.000Z"
  },
  {
    id: "10",
    name: "butter",
    createdAt: "2020-01-16T22:36:17.000Z",
    updatedAt: "2020-01-16T22:36:17.000Z"
  },
  {
    id: "12",
    name: "broccoli",
    createdAt: "2020-01-16T22:36:17.000Z",
    updatedAt: "2020-01-16T22:36:17.000Z"
  }
];

module.exports = function(app) {
  app.post("/api/user/create", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      var userId = dbUser.dataValues.id.toString();
      res.send(userId);
    });
  });

  app.get("/api/ingredient/search", function(req, res) {
    var url = "https://api.spoonacular.com/food/ingredients/autocomplete";
    var query = "?query=" + req.query.ingredientName;
    var numResults = "&number=" + "5";
    var apiKey = "&apiKey=" + process.env.SPOONACULAR_KEY;
    axios.get(url + query + numResults + apiKey).then(function(response) {
      res.send(response.data);
    });
  });

  app.get("/api/recipes/pantry", function(req, res) {
    // !!Query database for items in user database!!

    var ingredients = "";
    dummyPantryData.forEach(function(val, ind) {
      if (ind !== 0) {
        ingredients += ",";
      }
      ingredients += val.name;
    });

    var url =
      "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
    var numResults = "&number=" + "5";
    var instructions = "&instructionsRequired=true";
    var apiKey = "&apiKey=" + process.env.SPOONACULAR_KEY;

    axios
      .get(url + ingredients + numResults + instructions + apiKey)
      .then(function(response) {
        console.log(response.data);
        res.send(response.data);
      });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
