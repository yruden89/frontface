var tickets = [];

var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomSeatsClass = function () {
    var seatsClass = ["econom", "buisness", "first"];
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
    var stringValue = value.toString();
    var padLength = (minNumOfDegits - stringValue.length) > 0 ? minNumOfDegits - stringValue.length : 0;
    var pad = "";
    for (var i = 0; i < padLength; i++) {
        pad = pad + "0";
    }
    return pad + stringValue;
}

Time.prototype.toString = function() {
    var hours = this.hours < 10;
    return leftPad(this.hours, 2) + ":" + leftPad(this.minutes, 2);
};

Time.getRandomTime = function() {
    var minutes = ([0, 15, 30, 45])[randomNumber(0,3)];
    var hours = randomNumber(0,23);
    return new Time(hours, minutes).toString();
};

Time.parse = function (time){
    var splitted = time.split(":");
    var hours = splitted[0];
    var minutes = splitted[1];
    return new Time(parseInt(hours, 10), parseInt(minutes, 10));
};

var isLater = function(time, laterTime) {
    return (Time.parse(laterTime)).laterThan(Time.parse(time));
};

var  getRandomCompany = function () {
    var companies = ["badyl-avia", "luftwaffe", "natural_born"];
    return companies[randomNumber(0,2)];
};

var generateTickets = function () {
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

var filterTickets = function(filter) {
    return tickets.filter(function (ticket) {
        var isAppropriate = true;
        if(filter.company && (ticket.aircompany != filter.company)) isAppropriate = false;
        if(filter.seatsClass && (ticket.seatsClass != filter.seatsClass)) isAppropriate = false;
        if(filter.peopleCount && ticket.availableSeats < filter.peopleCount) isAppropriate = false;
        if(filter.searchStartTime && !isLater(filter.searchStartTime, ticket.flightStart)) isAppropriate = false;
        return isAppropriate;
    });
};

var orderBy = function(tickets, filterBy){
    var sortFunc = function(property) {
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
    var filters = {
        "byPrice": "price",
        "byFligthLength": "flightDuration",
        "byStartTime": "flightStart"
    };
    var filterProperty = filters[filterBy];
    if(!filterProperty) return;
    var filterFunction = sortFunc(filterProperty);
    tickets.sort(filterFunction);
};

generateTickets();

module.exports = {
    searchTickets: function (filters) {
        filters = filters || {};
        var filteredTickets = filterTickets(filters);
        orderBy(filteredTickets, filters.sorting);
        return filteredTickets;
    }
};
