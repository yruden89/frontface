var express = require('express');
var ticketsList = require('./ticketsList');
var app = express();

app.get('/', function (req, res) {
    res.send("Index");
});

app.get('/getTickets', function (req, res) {
    var url = require('url');
    var urlParsed = url.parse(req.url, true);
    var query = urlParsed.query;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(ticketsList.searchTickets(query));
});

app.listen(3000, function () {
    console.log("mock server started");
});
