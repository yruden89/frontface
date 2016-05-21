"use strict";

import GregorianCalendarFormatter from 'gregorian-calendar-format';

const DefaultDateFormat = "dd-MM-yyyy";

const formatter = new GregorianCalendarFormatter(DefaultDateFormat);

let format = {
    DefaultDateFormat: DefaultDateFormat,
    format: formatter.format.bind(formatter),
    parse: formatter.parse.bind(formatter)
};

export default format


