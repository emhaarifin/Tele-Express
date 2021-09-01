/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const user = require("../controller/users");
const upload = require("../middleware/multer");
const { verifyAccess } = require("../middleware/auth");

route
  .get("/profile/:id", verifyAccess, user.getUserByID)
  .get("/friends", verifyAccess, user.getFriend)
  .get("/actived/:token", user.activactions)
  .put("/profile/:id", verifyAccess, upload.single("avatar"), user.updateProfile)
  .post("/register", user.register)
  .post("/login", user.login);

module.exports = route;
