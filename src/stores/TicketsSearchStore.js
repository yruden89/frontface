import Reflux from "reflux"
import {SearchTickets} from "actions/TicketListActions";

let tickets = [];

let randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getRandomTime = function () {
    let minutes = (["00", "15", "30", "45"])[randomNumber(0,3)];
    let hours = randomNumber(0,23).toString();
    hours = hours.length > 1 ? hours : "0" + hours;
    return `${hours}:${minutes}`;
};

let getRandomSeatsClass = function () {
    let seatsClass = ["econom", "buisness", "first"];
    return seatsClass[randomNumber(0, 2)];
};

function Time(hours, minutes){
    this.hours = hours;
    this.minutes = minutes;
}

Time.prototype.laterThan = function(time) {
    if(this.hours < time.hours) return false;
    if(this.hours == time.minutes){
        if(this.minutes <= time.minutes) return false;
    }
    return true;
};

function leftPad(value, minNumOfDegits){
    let stringValue = value.toString();
    let padLength = (minNumOfDegits - stringValue.length) > 0 ? minNumOfDegits - stringValue.length : 0;
    return "0".repeat(padLength) + stringValue;
}

Time.prototype.toString = function() {
    let hours = this.hours < 10
    return `${leftPad(this.hours, 2)}:${leftPad(this.minutes, 2)}`;
};

Time.getRandomTime = function() {
    let minutes = ([0, 15, 30, 45])[randomNumber(0,3)];
    let hours = randomNumber(0,23);
    return new Time(hours, minutes).toString();
};

Time.parse = function (time){
    let [hours, minutes] = time.split(":");
    return new Time(parseInt(hours, 10), parseInt(minutes, 10));
};

let isLater = function(time, laterTime) {
    return (Time.parse(laterTime)).laterThan(Time.parse(time));
};

let  getRandomCompany = function () {
    let companies = ["badyl-avia", "luftwaffe", "natural_born"];
    return companies[randomNumber(0,2)];
};

let generateTickets = function () {
    for (var i = 0; i < 40; i++) {
        tickets.push({
            aircompany: getRandomCompany(),
            flightStart: Time.getRandomTime().toString(),
            flightEnd: Time.getRandomTime().toString(),
            flightDuration: randomNumber(1, 10),
            flightChangesCount: randomNumber(1, 3),
            price: randomNumber(1000, 5000),
            seatsClass: getRandomSeatsClass(),
            arrival: "",
            departure: "",
            flightDate: "",
            availableSeats: randomNumber(1, 10)
        });
    };
};

let filterTickets = function(filter) {
    return tickets.filter(function (ticket) {
        var isAppropriate = true;
        if(filter.company && (ticket.aircompany != filter.company)) isAppropriate = false;
        if(filter.seatsClass && (ticket.seatsClass != filter.seatsClass)) isAppropriate = false;
        if(filter.peopleCount && ticket.availableSeats < filter.peopleCount) isAppropriate = false;
        if(filter.searchStartTime && !isLater(filter.searchStartTime, ticket.flightStart)) isAppropriate = false;
        return isAppropriate;
    });
};

let orderBy = function(tickets, filterBy){
    let sortFunc = function(property) {
        return function (a, b) {
            if (a[property] > b[property]) {
                return 1;
            }
            if (a[property] < b[property]) {
                return -1;
            }
            return 0;
        };
    };
    let filters = {
        "byPrice": "price",
        "byFligthLength": "flightDuration",
        "byStartTime": "flightStart"
    };
    let filterProperty = filters[filterBy];
    if(!filterProperty) return;
    let filterFunction = sortFunc(filterProperty);
    tickets.sort(filterFunction);
};

generateTickets();

export default Reflux.createStore({

    init: function () {
        this.searchProps = {};
        this.listenTo(SearchTickets, "onSearchTickets");
    },
    onSearchTickets: function (filters) {
        var filteredTickets = filterTickets(filters);
        orderBy(filteredTickets, filters.sorting);
        this.trigger(filteredTickets);
    }
})
