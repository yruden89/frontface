var express = require('express');
var ticketsList = require('./ticketsList');
var citiesLocator = require('./citiesLocator');
var app = express();

app.get('/', function (req, res) {
    res.send("Index");
});

app.get('/getTickets', function (req, res) {
    var url = require('url');
    var urlParsed = url.parse(req.url, true);
    var query = urlParsed.query;

    res.set("Access-Control-Allow-Origin", "*");

    if(query.company === "unknown"){
        res.status(500).send("KABOOOM!");
        return;
    }

    setTimeout(function () {
        res.send(ticketsList.searchTickets(query));
    }, 3000);
});

app.get('/cities', function (req, res) {
    var url = require('url');
    var urlParsed = url.parse(req.url, true);
    var query = urlParsed.query;

    res.set("Access-Control-Allow-Origin", "*");

    res.send(citiesLocator.locateByName(query.name));
});

app.listen(3000, function () {
    console.log("mock server started");
});
