'use strict';

//css
import "../styles/css/purchase-form.css";

//import libs
import React from 'react';
import Reflux from 'reflux';
import {withRouter} from 'react-router';

//import actions

//import stores

//import components
import GenericPage from './GenericPage.jsx';

let PurchaseForm =  React.createClass({
    mixins:[Reflux.ListenerMixin],
    getInitialState: function() {
        return {}
    },
    componentDidMount: function() {

    },
    render: function () {
        return (
            <GenericPage className="purchase-form">
                <h1 className="heading">Приобрести билет(ы):</h1>
                <div className="ticket-section">
                    <div className="ticket-section-header">
                        <i className="fi-cloud"></i> Бадыль авиа
                    </div>
                    <div className="ticket-section-data">
                        <div className="row">
                            <div className="medium-4 columns">
                                <div className="ticket-section-airport-codes">
                                    LAX-JFK
                                </div>
                                <div>
                                    (Бирюлево-Егорьевск)
                                </div>
                            </div>
                            <div className="medium-8 columns">
                                <div className="row">
                                    <div className="medium-3 columns text-right">Рейс:</div>
                                    <div className="medium-8 columns">АА12345</div>
                                </div>
                                <div className="row">
                                    <div className="medium-3 columns text-right">Вылет:</div>
                                    <div className="medium-8 columns">12.04.2016 12:00</div>
                                </div>
                                <div className="row">
                                    <div className="medium-3 columns text-right">Посадка:</div>
                                    <div className="medium-8 columns">13.04.2016 04:00</div>
                                </div>
                                <div className="row">
                                    <div className="medium-3 columns text-right">Время полета:</div>
                                    <div className="medium-8 columns">16ч.</div>
                                </div>
                                <div className="row">
                                    <div className="medium-3 columns text-right">Класс:</div>
                                    <div className="medium-8 columns">Бизнес</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="purchase-form" action="success.html">
                    <fieldset>
                        <legend>Количество билетов:</legend>
                        <div className="row">
                            <div className="columns medium-2">
                                <input id="tickets-num" type="number" name="tickets-num"/>
                            </div>
                            <div className="columns medium-10 price-calc">
                            &times;
                                <span className="calc-value">100$
                                    <span className="calc-value-subtext">Цена билета</span>
                                </span>
                                +
                                <span className="calc-value">10$
                                    <span className="calc-value-subtext">Страховка</span>
                                </span>
                                =
                                <span className="calc-value">110$
                                    <span className="calc-value-subtext">Итого</span>
                                </span>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Оплата:</legend>
                        <div className="row">
                            <div className="medium-5 columns">
                                <label>
                                    Электронная почта:
                                    <input type="text" placeholder="yours@email.com"/>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-5 columns">
                                <label>
                                    Номер карты:
                                    <input type="text" name="card-number" placeholder="xxxx-xxxx-xxxx"/>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-5 columns">
                                <label>
                                    CVV2-код
                                    <input type="text" name="cvv" placeholder="xxx"/>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-5 columns">
                                <label>
                                    Приобрести страховку (10$)
                                    <input type="checkbox" name="insurance"/>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Данные о пассажирах</legend>
                        <div className="row passenger-info">
                            <div className="medium-5 columns">
                                <label>
                                    Имя и Фамилия пассажира(целиком):
                                    <input type="text" name="passenger-name" placeholder="Иванов Иван"/>
                                </label>
                            </div>
                            <div className="medium-5 columns">
                                <label>
                                    Номер паспорта:
                                    <input type="text" name="pass" placeholder="xxxxxx"/>
                                </label>
                            </div>
                        </div>
                        <div className="row passenger-info">
                            <div className="medium-5 columns">
                                <label>
                                    Имя и Фамилия пассажира(целиком):
                                    <input type="text" name="passenger-name" placeholder="Иванов Иван"/>
                                </label>
                            </div>
                            <div className="medium-5 columns">
                                <label>
                                    Номер паспорта:
                                    <input type="text" name="pass" placeholder="xxxxxx"/>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <div className="row">
                        <button className="button right" type="submit">Оплатить</button>
                    </div>
                </form>
            </GenericPage>
        )
    }
});

export default withRouter(PurchaseForm);
