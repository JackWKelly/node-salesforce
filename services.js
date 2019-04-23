"use strict";
//store sensitive data in a json that isn't put on github, import it here
//contains clientId and clientSecret
const secret = require('./secret.json');
var nforce = require('nforce');
var org = nforce.createConnection({
    clientId: secret.clientId,
    clientSecret: secret.clientSecret,
    redirectUri: 'http://localhost:3000/api/oauth/_callback',
    autoRefresh: true
});
//nforce automagically refreshes this
var oauthToken;

//make an empty "exports" object that we fill with functions, these are available to importers
var exports = module.exports = {};

exports.redirectForAuth = function(res){
    res.redirect(org.getAuthUri());
};

exports.authenticate = function(code){
    //since this doesn't have a callback supplied it acts as a promise, which will resolve into the controller
    return org.authenticate({ code: code });
};

exports.setToken = function(token){
    oauthToken = token;
};

exports.getFaqs = function(name){
    //spicy SQL injection vector here no doubt
    let queryString = `select Product__r.faq__r.name, Product__r.faq__r.Content__c from OwnerProductLink__c WHERE ProductOwner__r.name = '${name}'`;

    return org.query({ query: queryString, oauth: oauthToken });
};
