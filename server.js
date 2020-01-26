require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use((req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    const { id } = jwt.verify(token, process.env.APP_SECRET);

    req.user = id;
  }

  next();
});

const hbs = {
  defaultLayout: "main",
  helpers: {
    beginRow: function(conditional, options) {
      if (conditional % 2 === 0) {
        console.log(options.data.last);
        return options.fn(this);
      }
    },
    endRow: function(conditional, options) {
      if (conditional % 2 !== 0 || options.data.last === true) {
        return options.fn(this);
      }
    }
  }
};

// Handlebars
app.engine("handlebars", exphbs(hbs));

app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
