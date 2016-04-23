import Reflux from "reflux"
import {SetSearchProp} from "actions/LandingPageActions.js"

export default Reflux.createStore({
    init: function () {
        this.searchProps = {};
        this.listenTo(SetSearchProp, "onSetSearchProp");
    },
    onSetSearchProp: function (propName, prop) {
        this.searchProps[propName] = prop;
        this.validate();
    },
    validate: function () {
        let isValid = false;
        let searchProps = this.searchProps;
        if(searchProps.departure && searchProps.arrival && searchProps.flightDate) isValid = true;
        this.trigger({isValid: isValid});
    }
})
