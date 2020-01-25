var db = require("../models");
var axios = require("axios");

function assembleIngredientUrl(data) {
  var ingredientString = "";
  data.forEach(function (val, ind) {
    if (ind !== 0) {
      ingredientString += ",";
    }
    ingredientString += val.name;
  });
  return ingredientString;
}

// var renderOptions = {
//   title: "title",
//   header: "header",
//   showSearchByName: false,
//   showSearchByIngredients: false,
//   showNavBar: false,
//   excludeSearchByName; false,
//   excludeSearchByPantry: false
// };

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

module.exports = function (app) {
  // This is the route to log in the user.
  app.get("/login", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.render("index", { title: "Login", data: dbUsers });
    });
  });

  // Redirect '/' route to '/login'
  app.get("/", function (req, res) {
    res.redirect("/login");
  });

  // This route should display all ingredients of the user
  app.get("/pantry/manage", function (req, res) {
    res.render("pantry", {
      title: "Pantry",
      showNavBar: true,
      data: dummyPantryData
    });
  });

  // This route should display recipes that the user currently has in their database
  app.get("/recipes/pantry", function (req, res) {
    var url =
      "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";

    var ingredients = assembleIngredientUrl(dummyPantryData);
    var url2 =
      "&number=5&instructionsRequired=true&apiKey=" +
      process.env.SPOONACULAR_KEY;
    axios.get(url + ingredients + url2).then(function (response) {
      var data = response.data;
      res.render("recipes", {
        title: "Recipes",
        header: "Recipes by Pantry",
        showNavBar: true,
        excludeSearchByPantry: "true",
        data: data
      });
    });
  });

  // this route should update the quantity of an ingredient item in the database
  app.put("/pantry/ingredient/update", function (req, res) {
    var itemId = req.body.ingredientId;
    console.log("Updating quantity of itemId: " + itemId);
    setTimeout(function () {
      res.send({ redirect: "/pantry/manage" });
    }, 1000);
  });

  // this route should remove an ingredient item in the database
  app.delete("/pantry/ingredient/remove", function (req, res) {
    var itemId = req.body.ingredientId;
    console.log("Removing itemId: " + itemId);
    setTimeout(function () {
      res.send({ redirect: "/pantry/manage" });
    }, 1000);
  });

  // This route should display recipes that were searched by the user
  app.get("/recipes/search/name/:recipeName?", function (req, res) {
    var recipeName = req.params.recipeName;
    var url =
      "https://api.spoonacular.com/recipes/search?query=" +
      recipeName +
      "&number=2&instructionsRequired=true&apiKey=" +
      process.env.SPOONACULAR_KEY;
    axios.get(url).then(function (response) {
      // Prepend baseUrl to image url.
      var baseImageUrl = response.data.baseUri;
      response.data.results.forEach(function (val, ind) {
        var imagePath = response.data.results[ind].image;
        response.data.results[ind].image = baseImageUrl + imagePath;
      });

      var data = response.data.results;
      res.render("recipes", {
        title: "Recipes",
        header: "Search for a recipe",
        showNavBar: true,
        showSearchByName: true,
        excludeSearchByName: true,
        data: data
      });
    });
  });

  // this route displays all details of a recipe
  app.get("/recipe/details/:id", function (req, res) {
    var recipeId = req.params.id;
    var url =
      "https://api.spoonacular.com/recipes/" +
      recipeId +
      "/information?includeNutrition=false&apiKey=" +
      process.env.SPOONACULAR_KEY;
    axios.get(url).then(function (response) {
      var data = response.data;
      res.render("recipeDetails", {
        title: data.title,
        header: data.title + " recipe details",
        data: data
      });
    });
  });

  // This route should display recipes that were searched by ingredients
  app.get("/recipes/search/ingredients/:ingredients?", function (req, res) {
    var ingredients = req.params.ingredients;
    var url =
      "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
    var url2 =
      "&number=5&instructionsRequired=true&apiKey=" +
      process.env.SPOONACULAR_KEY;
    axios.get(url + ingredients + url2).then(function (response) {
      var data = response.data;
      res.render("recipes", {
        title: "Recipes",
        header: "Recipes searched by ingredient",
        showNavBar: true,
        showSearchByIngredient: true,
        excludeSearchByIngredients: true,
        data: data
      });
    });
  });

  app.get("/*", function (req, res) {
    res.render("404");
  });
};
