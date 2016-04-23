'use strict';

export default {

    //object methods
    copyProperties: function (obj, propertiesList) {
        var result = {};
        propertiesList.forEach(function (propertyName) {
            result[propertyName] = obj[propertyName]
        });
        return result;
    }

}
