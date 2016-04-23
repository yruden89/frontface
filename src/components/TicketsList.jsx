'use strict';

import React from 'react/addons';
import TicketListRow from './TicketListRow.jsx'

export default React.createClass({
    render: function () {
        var tickets = this.props.tickets || [];

        return (
            <table style={{width: "100%", overflow: "hidden"}}>
                <tr>
                    <th>Авиакомпания</th>
                    <th>Время вылета</th>
                    <th>Время посадки</th>
                    <th>Время в пути</th>
                    <th>Кол-во пересадок</th>
                    <th>Цена</th>
                    <th></th>
                </tr>
                {tickets.map(function(ticket){
                    return (<TicketListRow ticket={ticket}/>);
                })}
            </table>
        );
    }
});
