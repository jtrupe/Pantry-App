var db = require("../models");
var axios = require("axios");
require("dotenv").config();

module.exports = function (app) {
  app.post("/api/user/create", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      var userId = dbUser.dataValues.id.toString();
      res.send(userId);
    });
  });

  app.get("/api/ingredient/search", function (req, res) {
    var url = "https://api.spoonacular.com/food/ingredients/autocomplete";
    var query = "?query=" + req.query.ingredientName;
    var numResults = "&number=" + "5";
    var apiKey = "&apiKey=" + process.env.SPOONACULAR_KEY;
    axios.get(url + query + numResults + apiKey).then(function (response) {
      res.send(response.data);
    });
  });


  // When user adds an item to his pantry it is added to the master pantry (Ingredients model)
  app.post("/api/pantry/new", function (req, res) {
    db.Ingredient.create({
      name: req.body.name,
      measure: req.body.measure
    }).then(function (result) {
      res.json(result);
    })
  });

  // new favorite added: need to modify so user specific
  app.post("/api/favorites/new", function (req, res) {
    db.Favorite.create({
      name: req.body.name,
      url: req.body.url,
      photo: req.body.photo,
      recipeData: req.body.recipeData
      // lovedBy
    }).then(function (result) {
      res.json(result);
    })
  })

  app.put("/pantry/ingredient/update/:id", function (req, res) {
    db.User.update({
      userPantry: newPantry
    },{
      where: req.params.id
    })
  })
};

