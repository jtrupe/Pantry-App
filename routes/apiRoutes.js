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

  app.post("/api/pantry/new", function (req, res) {
    db.Ingredient.create({
      name: req.body.name
    }).then(function(response){
      console.log(response);
    })
  })
};

