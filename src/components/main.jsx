'use strict';

// CSS
require('normalize.css');
require('../styles/css/1-main.css');
require('../styles/css/common.css');

import React from 'react';
import Router from 'react-router';
let {Route, DefaultRoute, NotFoundRoute} = Router;
import LetsFlyApp from "./LetsFlyApp.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import TicketsList from "../pages/TicketsListPage.jsx";
import NotFound from "./NotFound.jsx";

let content = document.querySelector('.root');

let Routes = (
    <Route path="/" handler={LetsFlyApp}>
        <DefaultRoute handler={LandingPage}/>

        <Route name="ticketsList" path="tickets-list" handler={TicketsList}/>

        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
