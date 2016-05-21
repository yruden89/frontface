"use strict";

//css
import "../styles/css/rc-calendar-styles.css"

//import libs
import React from "react";
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';

//helpers
import DateFormat from 'helpers/DefaultDateFormat';

export default React.createClass({
    getInitialState: function() {
        return {
            value: ""
        }
    },
    getDefaultProps: function() {
        return {
            onChange: (value) => {}
        };
    },
    propTypes: {
        onChange: React.PropTypes.func,
        value: React.PropTypes.string
    },
    componentWillMount: function() {
        this.setState({ value: this.props.value });
    },
    componentWillReceiveProps: function(newProps) {
        if(!newProps.value) return;
        if(newProps.value !== DateFormat.format(this.state.value)) {
            this.setState({ value: DateFormat.parse(newProps.value) });
        }
    },
    render: function () {
        let calendar = (<Calendar formatter="dd-MM-yyyy"/>);
        return(
            <DatePicker value={ this.state.value } animation="slide-up" formatter="dd-MM-yyyy" calendar={ calendar }
                onChange={this.setDate}>
                {
                    ({value}) => {
                        return (
                            <div className="row collapse">
                                <div className="small-9 columns">
                                    <input placeholder="dd-MM-yyyy" type="text" name="flightDate"
                                        value={value ? DateFormat.format(value): ""}/>
                                </div>
                                <div className="small-3 columns">
                                    <a className="postfix button" tabindex="-1" href="#">
                                        <i className="control-icon fi-calendar"></i>
                                    </a>
                                </div>
                            </div>
                        );
                    }
                }
            </DatePicker>
        );
    },
    setDate: function (gregorianDateCalendar) {
        this.setState({ value: gregorianDateCalendar }, () => {
            if(this.props.onChange) this.props.onChange(DateFormat.format(gregorianDateCalendar));
        });
    }
});

