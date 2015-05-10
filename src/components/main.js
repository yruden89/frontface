'use strict';

// CSS
require('normalize.css');
require('../styles/css/1-main.css');
require('../styles/css/common.css');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var LetsFlyApp = require("./LetsFlyApp.jsx");
var LandingPage = require("./LandingPage.jsx");
var TicketsList = require("./TicketsList.jsx");
var NotFound = require("./NotFound.jsx");

var content = document.querySelector('.root');

var Routes = (
    <Route paht="/" handler={LetsFlyApp}>
        <DefaultRoute handler={LandingPage}/>

        <Route name="tickets-list" handler={TicketsList}/>

        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
