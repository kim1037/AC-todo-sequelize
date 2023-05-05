// Include packages and define server related variables
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const session = require("express-session");
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// setting session
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);
// setting body-parser
app.use(express.urlencoded({ extended: true }));

//setting middleware
app.use(methodOverride("_method"));
app.use(express.static("public"));

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// setting routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
