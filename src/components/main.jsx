'use strict';

// CSS
require('normalize.css');
require('../styles/css/1-main.css');
require('../styles/css/common.css');

import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import LetsFlyApp from "./LetsFlyApp.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import TicketsList from "../pages/TicketsListPage.jsx";
import PurchaseForm from "../pages/PurchaseForm.jsx";
import NotFound from "./NotFound.jsx";


ReactDom.render((
    <Router history={browserHistory}>
        <Route path="/" component={LetsFlyApp}>
            <IndexRoute component={LandingPage}/>

            <Route name="ticketsList" path="tickets-list" component={TicketsList}/>
            <Route name="purchaseForm" path="purchase-form" component={PurchaseForm}/>

            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
), document.querySelector(".root"));
