'use strict';

var React = require('react/addons');

var NotFound = React.createClass({
    render: function () {
        return (
            <h1>
                Oooops!
                <h2>Not found.</h2>
            </h1>
        );
    }
});

module.exports = NotFound;
