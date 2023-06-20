var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dev_db_url =
  "mongodb+srv://CEME82:WmnFyEvgl5DEBJYG@cluster0.wa48p5z.mongodb.net/local_library?retryWrites=true&w=majority";
// Set up ConnectionString DB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const MongoDB = dev_db_url;
main();

async function main() {
  await mongoose
    .connect(MongoDB)
    .then(console.log("Conexion exitosa"))
    .catch((err) => console.log(err));
}

//import routers modules
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog");
const compression = require("compression");
const helmet = require("helmet");

var app = express();

//app.use(compression); Investigar

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowsMs: 1 * 60 * 1000,
  max: 30,
});
app.use(limiter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);
// Compress all routes

// Set up the Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Assing routers to App.
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users/cool", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
