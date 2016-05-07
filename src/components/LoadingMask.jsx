"use strict";
require('../styles/css/loading-animation.css');

import React from "react/addons"

export default React.createClass({
    getInitialState: function() {
        return {
            isLoading: false
        }
    },
    componentWillMount: function() {
        this.unlistenAction = this.props.action.listen(this.show, this);
        this.unlistenStore = this.props.store.listen(this.hide, this);
    },
    render: function () {
       return (
           <div className={this.state.isLoading ? "loading-mask__active" : ""}>
                {this.props.children}
           </div>
       );
    },
    show: function () {
        this.setState({ isLoading: true });
    },
    hide: function () {
        this.setState({ isLoading: false });
    },
    componentWillUnmount: function () {
        this.unlistenAction();
        this.unlistenStore();
    }
});
