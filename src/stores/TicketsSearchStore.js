import Reflux from "reflux"
import {SearchTickets} from "actions/TicketListActions";

let tickets = [];
let ticket = {
    aircompany: "Бадыль авиа",
    flightStart: "18:00",
    flightEnd: "23:00",
    flightDuration: 5,
    flightChangesCount: 0,
    price: 5000
};
for (var i = 0; i < 10; i++) {
    tickets.push( Object.create(ticket));
}

export default Reflux.createStore({

    init: function () {
        this.searchProps = {};
        this.listenTo(SearchTickets, "onSearchTickets");
    },
    onSearchTickets: function (filters) {
        this.trigger(tickets);
    }
})
