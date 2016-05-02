import Reflux from "reflux"
import {SearchTickets} from "actions/TicketListActions";
import superAgent from "superagent";

export default Reflux.createStore({

    init: function () {
        this.searchProps = {};
        this.listenTo(SearchTickets, "onSearchTickets");
    },
    onSearchTickets: function (filters) {
        superAgent
            .get("//localhost:3000/getTickets")
            .query(filters)
            .end(function (err, response) {
                if(err) return;
                this.trigger(response.body);
            }.bind(this));
    }
})
