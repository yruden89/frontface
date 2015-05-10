'use strict';

//css
require('../styles/css/index.css');

var React = require('react/addons');
var Link = require('react-router').Link;

var LandingPage = React.createClass({
    render: function () {
        return (
            <div className="landing-page">
                <div className="wrapper">
                    <h1 className="landing-header">
                        <div className="call">Where do you want to fly today?</div>
                    Let`s fly
                    </h1>
                    <form className="flight-places-form" action="#">
                        <p className="login-info">You aren`t new? <a href="#">Login.</a></p>
                        <div className="row">
                            <div className="small-10 medium-6 large-3 columns">
                                <input type="text" placeholder="from" name="from"/>
                            </div>
                            <div className="small-10 medium-6 large-3 columns">
                                <input type="text" placeholder="to" name="to"/>
                            </div>
                            <div className="small-10 medium-6 large-3 columns">
                                <div className="row collapse">
                                    <div className="small-9 columns">
                                        <input placeholder="dd/mm/yy" type="text" name="flightDate"/>
                                    </div>
                                    <div className="small-3 columns">
                                        <a className="postfix button" href="#">
                                            <i className="control-icon fi-calendar"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="small-10 medium-6 large-3 columns">
                                <Link className="proceed-button" to="tickets-list">
                                Search tickets
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                        </div>
                        <div className="row">
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = LandingPage;
