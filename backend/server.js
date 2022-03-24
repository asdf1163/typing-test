const express = require("express");
// var createError = require('http-errors')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const database = require("./database/db");
// const vhost = require("vhost");

const userRoute = require("./routes/user.routes");

mongoose
  .connect(database.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("DB Connected Sucessfuly");
    },
    (error) => {
      console.log(`DB connection failed: ${error}`);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", userRoute);

// app.use((req, res, next) => {
//   next(createError(404, "Wrong Database Connection"));
// });

app.get("/", function (req, res, next) {
  res.json({
    status: "Success!",
  });
});

const port = 8080;

const server = app.listen(port, function () {
  console.log(`Connected to port ${port}`);
});

// app.use((req, res, next) => {
//   next(createError(404, 'Wrong Database Connection'));
// });

// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });
