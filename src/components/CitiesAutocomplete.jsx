"use strict";

//css
require('../styles/css/awesomeplete.css');

//import libs
import React from "react"
import Reflux from "reflux"
import Awesomeplete from "Awesomplete"
import _ from "lodash"
import superAgent from "helpers/superagentSetup"

let DEBOUNCE_RATE = 500;
let CITIES_URL = "/cities";

export default React.createClass({
    getDefaultProps: function() {
        return {
            onChange: (value) => {},
            autofocus: false,
            placeholder: "",
            name: ""
        };
    },
    propTypes: {
        onChange: React.PropTypes.func,
        autofocus: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        name: React.PropTypes.string
    },
    componentDidMount: function() {
        let wrapper =  this.refs.wrapper;
        this.autocompleteInput = wrapper.querySelector("input");
        this.awesomplete = new Awesomeplete(this.autocompleteInput);

        this.searchCities =  _.debounce(this.searchCities, DEBOUNCE_RATE);
        this.autocompleteInput.addEventListener("input", this.onAutocompleteInput);
        this.autocompleteInput.addEventListener("awesomplete-selectcomplete", this.onItemSelected);

        if(this.props.autofocus == true){
            this.autocompleteInput.focus();
        }

        if(this.props.value){
            this.autocompleteInput.value = this.props.value;
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.value != undefined && nextProps.value !== this.autocompleteInput.value){
            this.autocompleteInput.value = nextProps.value;
        }
    },
    shouldComponentUpdate: function() {
        return false;
    },
    render: function() {
        let placeholder = _.escape(this.props.placeholder);
        let name = _.escape(this.props.name);
        let renderInput = () => `<input type="text" class="awesomeplete" placeholder="${placeholder}" name="${name}"/>`;
        return (
            <div ref="wrapper" dangerouslySetInnerHTML={ { __html: renderInput() } }></div>
        );
    },
    onAutocompleteInput: function(e) {
        this.searchCities();
        this.invokeChangeHandler(e);
    },
    onItemSelected: function(e) {
        this.invokeChangeHandler(e);
    },
    searchCities: function() {
        superAgent
            .get(CITIES_URL)
            .query({ name: this.autocompleteInput.value})
            .end(function (err, response) {
                if(err) return;
                this.onCitiesFound(response.body);
            }.bind(this));

    },
    onCitiesFound: function(cities) {
        this.awesomplete.close();
        this.awesomplete.list = cities.map((city) => city.cityName);
        this.awesomplete.open();
    },
    invokeChangeHandler: function(e) {
        if(this.props.onChange){
            this.props.onChange(e);
        }
    },
    componentWillUnmount: function() {
        this.autocompleteInput.removeEventListener("input", this.onAutocompleteInput);
        this.autocompleteInput.removeEventListener("awesomplete-selectcomplete", this.onItemSelected);
    }
})
