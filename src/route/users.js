/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const user = require('../controller/users');
const upload = require('../middleware/multer');

route
  .get('/profile/:id', user.getUserByID)
  .get('/actived/:token', user.activactions)
  .put('/profile/:id', upload.single('avatar'), user.updateProfile)
  .post('/register', user.register)
  .post('/login', user.login);

module.exports = route;
