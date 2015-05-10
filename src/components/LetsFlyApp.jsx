'use strict';

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var LetsFlyApp = React.createClass({
    render: function () {
        return (
            <RouteHandler/>
        );
    }
});

module.exports = LetsFlyApp;
