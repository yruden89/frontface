import Reflux from "reflux"
import {SearchTickets} from "actions/TicketListActions"
import superAgent from "helpers/superagentSetup"

export default Reflux.createStore({

    init: function () {
        this.listenTo(SearchTickets, "onSearchTickets");
    },
    onSearchTickets: function (filters) {
        superAgent
            .get("/getTickets")
            .query(filters)
            .end(function (err, response) {
                if(err) return;
                this.trigger(response.body);
            }.bind(this));
    }
})
