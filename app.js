"use strict";

const express = require('express');
const app = express();

//custom dependencies
const routes = require('./routes');

//set api routes
app.use('/api/', routes);

//catch non valid routes
app.get('*', function(req,res){
    res.status(404).send('Not found!');
});

let port = 3000;
app.listen(port, function(){
    console.log(`Listening on port ${port}!`);
})