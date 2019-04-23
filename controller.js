"use strict";
const services = require('./services');

//make an empty "exports" object that we fill with functions, these are available to importers
var exports = module.exports = {};

//start the authentication process
exports.redirectForAuth = function(req, res){
    services.redirectForAuth(res);
};

//called by the SalesForce redirect
exports.authenticate = function(req, res){
    let code = req.query.code;
    services.authenticate(code) //this returns a promise
    .then(token => {
        console.log("Authenticated!");
        services.setToken(token);
    })
    .catch(err => {
        console.error(`Error authenticating: ${err}`);
    });
};

exports.getFaqs = function(req,res){
    let name = req.query.name;
    services.getFaqs(name)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.error(`Error during query: ${err}`);
        res.status(404).send(`Error: ${err}`);
    })
};
