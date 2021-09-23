/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const message = require('../controller/messages');
const { verifyAccess } = require('../middleware/auth');

route
  .get('/:receiver_id', verifyAccess, message.getMessageById)
  .delete('/:receiver_id', verifyAccess, message.deleteMessage);

module.exports = route;
