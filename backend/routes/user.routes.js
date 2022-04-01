const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var createError = require("http-errors");

let user = require("../models/userSignupSchema");
let userLogin = require("../models/userLoginSchema");

const createUser = (propsData, res) => {
  user.create(propsData, (error, data) => {
    if (error) {
      return console.log("error", error);
    } else {
      console.log("User created successfully !!!");
      res.json(data);
    }
  });
};

router.route("/signup").post((req, res, next) => {
  const parametrs = [
    { username: req.body.username },
    { email: req.body.email },
  ];
  user.find({ $or: parametrs }, function (error, data) {
    if (error) {
      return next(createError(401, "Missing data ?"));
    } else {
      if (data.length === 0) {
        createUser(req.body, res);
        return true;
      } else {
        return console.log("User Not Created! Doubled vales");
      }
    }
  });
});

router.route("/login").post((req, res, next) => {
  userLogin.find(req.body, function (error, data) {
    if (error) {
      return next(createError(401, "User not found ?"));
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
