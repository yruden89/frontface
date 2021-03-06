'use strict';

//css
import "../styles/css/index.css";

//import libs
import React from 'react';
import Reflux from 'reflux';
import {withRouter} from 'react-router';

//import actions
import {SetSearchProp} from "actions/LandingPageActions.js"

//import stores
import LandingPageStore from "stores/LandingPageStore"

//import components
import Autocomplete from "components/CitiesAutocomplete.jsx"
import DatePicker from 'components/DatePicker.jsx';

let LandingPage =  React.createClass({
    mixins:[Reflux.ListenerMixin],
    getInitialState: function() {
        return { departure: "", arrival: "", flightDate: "", isValid: false}
    },
    componentDidMount: function() {
        this.listenTo(LandingPageStore, this.onValidChange);
    },

    setDeparture: function(e) {
        this.setState({departure: e.target.value});
        SetSearchProp("departure", e.target.value);
    },
    setArrival: function(e) {
        this.setState({arrival: e.target.value});
        SetSearchProp("arrival", e.target.value)
    },
    setFlightDate: function (date) {
        this.setState({flightDate: date});
        SetSearchProp("flightDate", date);
    },
    onValidChange: function(data) {
        this.setState({isValid: data.isValid});
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.props.router.push({
            pathname: "tickets-list",
            query: {
                from: this.state.departure,
                to: this.state.arrival,
                when: this.state.flightDate
            }
        });
    },
    render: function () {
        return (
            <div className="landing-page">
                <div className="wrapper">
                    <h1 className="landing-header">
                        <div className="call">Where do you want to fly today?</div>
                    Let`s fly
                    </h1>
                    <form className="flight-places-form" action="#" onSubmit={this.onSubmit}>
                        <p className="login-info">You aren`t new? <a href="#">Login.</a></p>
                        <div className="row">
                            <div className="small-10 medium-6 large-3 columns">
                                <Autocomplete autofocus={true} placeholder="from" name="from" onChange={this.setDeparture}/>
                            </div>
                            <div className="small-10 medium-6 large-3 columns">
                                <Autocomplete type="text" placeholder="to" name="to" onChange={this.setArrival}/>
                            </div>
                            <div className="small-10 medium-6 large-3 columns">
                                <DatePicker  onChange={this.setFlightDate}/>
                            </div>
                            <div className="small-10 medium-6 large-3 columns">
                                <button type="submit" className="proceed-button" to="tickets-list" disabled={!this.state.isValid}>
                                Search tickets
                                </button>
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

export default withRouter(LandingPage);
