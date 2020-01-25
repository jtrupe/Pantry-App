var db = require("../models");
var axios = require("axios");
require("dotenv").config();

//helper function to add 0s to new user, so that all pantry keys are the same length
function printZeros(num) {
  let zString = "";
  for (let i = 0; i < num; i++) {
    zString += "0"
  }
  return zString;
}

module.exports = function (app) {
  app.post("/api/user/create", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      var userId = dbUser.dataValues.id.toString();
      res.send(userId);
    });
    db.User.findOne({
      where: { id: 1 }
    }).then(function (res) {
      let zeroes = res.pantryKey.length - 1;
      let initialPantryKey = "1" + printZeros(zeroes);
      db.User.update({
        pantryKey: initialPantryKey
      }, {
        where: { pantryKey: "" }
      }).done();
    })
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
    }).then(function (response) {
      let user = req.body.user;
      console.log(response);
      db.User.findOne({
        where: { id: user }
      }).then(function (result) {
        let newPantry = result.pantryKey + "1";
        console.log(newPantry);
        db.User.update(
          { pantryKey: newPantry },
          {
            where: { id: result.id }
          }).then(function (res) {
            db.User.findAll({
              exclude: { id: user }
            }).then(function (results) {
              console.log("Not logged in users:");
              console.log(results);
              console.log(user);
              for (let i = 0; i < results.length; i++) {
                var toId = i + 1;
                if (toId == user) { continue; };
                newPantry = results[i].pantryKey + "0";
                console.log(newPantry);
                db.User.update({
                  pantryKey: newPantry
                }, {
                  where: { id: toId }
                }).done();
              }
            })
          })
      })
    })
  })
};

