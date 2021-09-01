/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const users = require("./users");
const messages = require("./messages");
route.use("/auth", users).use("/messages", messages);

module.exports = route;
