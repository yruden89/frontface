'use strict'

//css
require('../styles/css/tickets-search.css');

//import libs
import React from'react';
import {withRouter} from 'react-router'
import Reflux from 'reflux';
import helper from 'helpers/generalHelpers'

//import actions
import {SearchTickets} from "actions/TicketListActions";

//import stores
import TicketSearchStore from "stores/TicketsSearchStore.js";

//import components
import GenericPage from './GenericPage.jsx';
import TicketsList from 'components/TicketsList.jsx';
import LoadingMask from  'components/LoadingMask.jsx'


let TicketsListPage =  React.createClass({
    mixins: [Reflux.connect(TicketSearchStore, "tickets")],

    getInitialState: function () {
        return {
            isValidRequest: true,

            tickets: [], //tickets list

            departure: "", //flight params
            arrival: "",
            flightDate: "",

            company: "", //ticket list filters
            peopleCount: 1,
            seatsClass: "",
            sortBy: "none",
            searchStartTime: "00:00"
        }
    },

    componentWillMount: function() {
        let { query } = this.props.location;
        let departure = query.from;
        let {to, when} = query;
        if(!departure || ! to || !when){
            this.setState({isValidRequest: false});
        } else {
            let filter = {
                arrival: to,
                departure: departure,
                flightDate: when
            };
            this.setState(Object.assign({ isValidRequest: true }, filter));
            SearchTickets(filter);
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
                <form action="#" className="filters row" onSubmit={this.startSearch}>
                    <label className="small-12 medium-4 large-2 columns">
                    Вылет не раньше
                        <input type="time" name="searchStartTime" value={this.state.searchStartTime} onChange={this.setSearchStartTime}/>
                    </label>
                    <label className="small-12 medium-4 large-3 columns">
                        Авиакомпания
                        <select name="company" value={this.state.company} onChange={this.setCompany}>
                            <option value="">--</option>
                            <option value="badyl-avia">Бадыль Авиа</option>
                            <option value="luftwaffe">Люфтваффе</option>
                            <option value="natural_born">Рожденые ползать</option>
                            <option value="unknown">Неизвестная компания</option>
                        </select>
                    </label>
                    <label className="small-12 medium-4 large-2 columns">
                        Количество людей
                        <input type="number" name="peopleCount"  value={this.state.peopleCount} onChange={this.setPeopleCount}/>
                    </label>
                    <label className="small-12 medium-4 large-3 columns">
                        Места:
                        <select name="flightClass" value={this.state.seatsClass} onChange={this.setSeatsClass}>
                            <option value="">--</option>
                            <option value="econom">Эконом</option>
                            <option value="buisness">Бизнес</option>
                            <option value="first">Первый</option>
                        </select>
                    </label>
                    <label className="small-12 medium-4  large-2 columns">
                        Сортировать по:
                        <select name="sorting" value={this.state.sorting} onChange={this.setSorting}>
                            <option value="none">---</option>
                            <option value="byPrice">цене</option>
                            <option value="byFligthLength">времени полета</option>
                            <option value="byStartTime">времени вылета</option>
                        </select>
                    </label>
                </form>
                <h2 className="tickets-header">Билеты:</h2>

                <LoadingMask action={SearchTickets} store={TicketSearchStore}>
                    <TicketsList tickets={this.state.tickets}></TicketsList>
                </LoadingMask>
            </GenericPage>
        );
    },

    startSearch: function(e) {
        let filter = helper.copyProperties(this.state,
            ["arrival", "departure", "flightDate", "sorting", "seatsClass", "peopleCount", "company", "searchStartTime"]);
        SearchTickets(filter);
    },

    //change handlers
    setSearchStartTime: function(e) {
        this.setState({ searchStartTime: e.target.value}, function () {
            this.startSearch();
        })
    },

    setSorting: function(e) {
        this.setState({ sorting: e.target.value }, function(){
            this.startSearch();
        });
    },

    setSeatsClass: function(e) {
        this.setState({ seatsClass: e.target.value }, function(){
            this.startSearch();
        });
    },

    setPeopleCount: function (e) {
        this.setState({ peopleCount: e.target.value }, function(){
            this.startSearch();
        });
    },

    setCompany: function (e) {
        this.setState({ company: e.target.value }, function(){
            this.startSearch();
        });
    }

});

export default withRouter(TicketsListPage)
