// Include packages and define server related variables
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// setting body-parser
app.use(express.urlencoded({ extended: true }));

//setting middleware
app.use(methodOverride("_method"));
app.use(express.static("public"));


// setting routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
