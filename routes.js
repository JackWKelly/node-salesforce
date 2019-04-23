"use strict";
const express = require('express');
const router = express.Router();
const controller = require('./controller');

//the router sends any requests to these urls to the function after the comma
router.get('/oauth', controller.redirectForAuth);
router.get('/oauth/_callback', controller.authenticate);

router.get('/db/getfaqs', controller.getFaqs);

//makes the router object available to anyone who imports this file
module.exports = router;