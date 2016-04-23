'use strict'

import React from "react/addons"

export default React.createClass({
    render: function () {
        return (
            <div {...this.props}>
                <header className="header">
                    <div className="wrapper">
                        <span className="left">Let`s fly</span>
                        <a className="right" href="#">Войти</a>
                    </div>
                </header>
                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
