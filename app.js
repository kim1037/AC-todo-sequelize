// Include packages and define server related variables
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// setting body-parser
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
//use middleware

// setting routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
