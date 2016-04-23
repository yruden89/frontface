'use strict'

//css
require('../styles/css/tickets-search.css');

import React from'react/addons';
import {State} from 'react-router'
import GenericPage from './GenericPage.jsx';
import TicketsList from 'components/TicketsList.jsx';
import TicketSearchStore from "stores/TicketsSearchStore.js";
import {SearchTickets} from "actions/TicketListActions";
import Reflux from 'reflux';

export default React.createClass({
    mixins: [State, Reflux.connect(TicketSearchStore, "tickets")],
    getInitialState: function () {
        return {
            isValidRequest: true,
            tickets: [],
            departure: "",
            arrival: "",
            flightDate: ""
        }
    },
    componentWillMount: function() {
        let query = this.getQuery();
        let departure = query.from;
        let {to, when} = query;
        if(!departure || ! to || !when){
            this.setState({isValidRequest: false});
        } else {
            this.setState({
                isValidRequest: true,
                arrival: to,
                departure: departure,
                flightDate: when
            });
            SearchTickets();
        }
    },
    render: function () {
        if(!this.state.isValidRequest) {
            return (
                <GenericPage className="tickets-search">
                    <h1>Ошибочный запрос</h1>
                </GenericPage>
            );
        }

        return (
            <GenericPage className="tickets-search">
                <h1 className="route">{this.state.departure} - {this.state.arrival}({this.state.flightDate})</h1>
                <form action="#" className="filters row">
                    <label className="small-12 medium-4 large-2 columns">
                    Вылет не раньше
                        <input type="time" name="searchStartTime"/>
                    </label>
                    <label className="small-12 medium-4 large-3 columns">
                    Авиакомпания
                        <select name="company">
                            <option value="badyl-avia">Бадыль Авиа</option>
                            <option value="luftwaffe">Люфтваффе</option>
                            <option value="natural_born">Рожденые ползать</option>
                        </select>
                    </label>
                    <label className="small-12 medium-4 large-2 columns">
                    Количество людей
                        <input type="number" name="peopleCount"/>
                    </label>
                    <label className="small-12 medium-4 large-3 columns">
                    Места:
                        <select name="flightClass">
                            <option value="econom" selected>Эконом</option>
                            <option value="buisness">Бизнес</option>
                            <option value="first">Первый</option>
                        </select>
                    </label>
                    <label className="small-12 medium-4  large-2 columns">
                    Сортировать по:
                        <select name="sorting">
                            <option value="none" selected>---</option>
                            <option value="byPrice">цене</option>
                            <option value="byFligthLength">времени полета</option>
                            <option value="byStartTime">времени вылета</option>
                        </select>
                    </label>
                </form>
                <h2 className="tickets-header">Билеты:</h2>
                <TicketsList tickets={this.state.tickets}></TicketsList>
            </GenericPage>
        );
    }
});
