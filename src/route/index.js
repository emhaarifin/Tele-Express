/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const users = require('./users');

route.use('/auth', users);

module.exports = route;
