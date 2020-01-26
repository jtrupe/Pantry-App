var db = require("../models");
var axios = require("axios");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//helper to add 0s to new user, so that all pantry keys are the same length
function printZeros(num) {
  let zString = "";
  for (let i = 0; i < num; i++) {
    zString += "0";
  }
  return zString;
}

module.exports = function(app) {
  app.post("/api/user/create", function(req, res) {
    
    db.User.create(req.body).then(function(dbUser) {
      var userId = dbUser.dataValues.id.toString();
      res.send(userId);
    });
    db.User.findOne({
      where: { id: 1 }
    }).then(function(res) {
      let zeroes = res.pantryKey.length - 1;
      let initialPantryKey = "1" + printZeros(zeroes);
      db.User.update(
        {
          pantryKey: initialPantryKey
        },
        {
          where: { pantryKey: "" }
        }
      ).done();
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

  app.post("/api/pantry/new", function(req) {
    db.Ingredient.create({
      name: req.body.name
    }).then(function(response) {
      let user = req.body.user;
      console.log(response);
      db.User.findOne({
        where: { id: user }
      }).then(function(result) {
        let newPantry = result.pantryKey + "1";
        console.log(newPantry);
        db.User.update(
          { pantryKey: newPantry },
          {
            where: { id: result.id }
          }
        ).then(function() {
          db.User.findAll({
            exclude: { id: user }
          }).then(function(results) {
            console.log("Not logged in users:");
            console.log(results);
            console.log(user);
            for (let i = 0; i < results.length; i++) {
              var toId = i + 1;
              if (toId === user) {
                continue;
              }
              newPantry = results[i].pantryKey + "0";
              console.log(newPantry);
              db.User.update(
                {
                  pantryKey: newPantry
                },
                {
                  where: { id: toId }
                }
              ).done();
            }
          });
        });
      });
    });
  });
  app.get('/api/user', function(req, res) {});

	app.get('/api/user/logout', function(req, res) {
		res.clearCookie('token');

		res.json('logged out user');
	});

	app.post('/api/user/signup', async function(req, res) {
		const email = req.body.email.toLowerCase();

		//hash our password
		// bcrypt.hash(req.body.password, 10).then(function(data) {});
		const password = await bcrypt.hash(req.body.password, 10);

		//create the user in the database
		const user = await db.User.create({
			email: email,
			password: password
		});

		//create our cookie
		const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});

		res.json(user);
	});
	app.post('/api/user/login', async function(req, res) {
		const user = await db.User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (!user) {
			res.json('NO USER FOUND WITH THAT EMAIL');
		}

		const valid = await bcrypt.compare(req.body.password, user.password);

		if (!valid) {
			res.json('INCORRECT PASSWORD ENTERED');
		}

		//create our cookie
		const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});

		res.json(user);
	});
};


