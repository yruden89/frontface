'use strict';

import React from 'react';

export default React.createClass({
    render: function () {
        let ticket = this.props.ticket;
        let flightDuration = ticket.flightDuration;
        let hoursRemainder = flightDuration % 10;
        let flightDurationLabel;
        if(flightDuration => 11 &&  flightDuration <= 14) {
            flightDurationLabel = `${flightDuration} часов`;
        } else if ( hoursRemainder === 1  ){
            flightDurationLabel = `${flightDuration} час`;
        } else if( hoursRemainder => 2 && hoursRemainder <= 4){
            flightDurationLabel = `${flightDuration} часа`;
        } else {
            flightDurationLabel = `${flightDuration} часов`;
        }
        return (
            <tr>
                <td data-label="Авиакомпания">{ticket.aircompany}</td>
                <td data-label="Время вылета">{ticket.flightStart}</td>
                <td data-label="Время посадки">{ticket.flightEnd}</td>
                <td data-label="Время в пути">{flightDuration}</td>
                <td data-label="Кол-во">{ticket.flightChangesCount}</td>
                <td data-label="Цена">{ticket.price} руб.</td>
                <td data-label="">
                    <a href="#" className="button">Купить билет</a>
                </td>
            </tr>
        );
    }
});
