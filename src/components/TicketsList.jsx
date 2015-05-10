'use strict'

//css
require('../styles/css/tickets-search.css');

var React = require('react/addons');

var TicketsList = React.createClass({
    render: function () {
        return (
            <div className="tickets-search">
                <header className="header">
                    <div className="wrapper">
                        <span className="left">Let`s fly</span>
                        <a className="right" href="#">Войти</a>
                    </div>
                </header>
                <div className="wrapper">
                    <h1 className="route">Mocква - Адлер</h1>
                    <form action="#" className="filters row">
                        <label className="small-12 medium-4 large-2 columns">
                        Вылет не раньше
                            <input type="time" name="searchStartTime"/>
                        </label>
                        <label className="small-12 medium-4 large-3 columns">
                        Авиакомпания
                            <select name="company">
                                <option value="badyl-avia">Бадыль Авиа</option>
                                <option value="luftwaffe">Люфтваффе</option>
                                <option value="natural_born">Рожденые ползать</option>
                            </select>
                        </label>
                        <label className="small-12 medium-4 large-2 columns">
                        Количество людей
                            <input type="number" name="peopleCount"/>
                        </label>
                        <label className="small-12 medium-4 large-3 columns">
                        Места:
                            <select name="flightClass">
                                <option value="econom" selected>Эконом</option>
                                <option value="buisness">Бизнес</option>
                                <option value="first">Первый</option>
                            </select>
                        </label>
                        <label className="small-12 medium-4  large-2 columns">
                        Сортировать по:
                            <select name="sorting">
                                <option value="none" selected>---</option>
                                <option value="byPrice">цене</option>
                                <option value="byFligthLength">времени полета</option>
                                <option value="byStartTime">времени вылета</option>
                            </select>
                        </label>
                    </form>
                    <h2 className="tickets-header">Билеты:</h2>
                    <table style={{width: "100%", overflow: "hidden"}}>
                        <tr>
                            <th>Авиакомпания</th>
                            <th>Время вылета</th>
                            <th>Время посадки</th>
                            <th>Время в пути</th>
                            <th>Кол-во</th>
                            <th>Цена</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td data-label="Авиакомпания">Бадыль Авиа</td>
                            <td data-label="Время вылета">18.00</td>
                            <td data-label="Время посадки">20.00</td>
                            <td data-label="Время в пути">2 часа</td>
                            <td data-label="Кол-во">0 пересадок</td>
                            <td data-label="Цена">2000 руб.</td>
                            <td data-label="">
                                <a href="#" className="button">Купить билет</a>
                            </td>
                        </tr>
                        <tr>
                            <td data-label="Авиакомпания">Бадыль Авиа</td>
                            <td data-label="Время вылета">18.00</td>
                            <td data-label="Время посадки">20.00</td>
                            <td data-label="Время в пути">2 часа</td>
                            <td data-label="Кол-во">0 пересадок</td>
                            <td data-label="Цена">2000 руб.</td>
                            <td data-label="">
                                <a href="#" className="button">Купить билет</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = TicketsList;
