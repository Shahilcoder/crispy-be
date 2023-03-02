const express = require('express');
const { postMessage, getMessage } = require('../controllers/message.controllers');
const messageRouter = express.Router();

messageRouter.get('/', getMessage);
messageRouter.post('/', postMessage);

module.exports = messageRouter;