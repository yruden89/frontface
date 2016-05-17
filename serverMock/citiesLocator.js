var cities = require('./cities.json');

module.exports = {
    locateByName: function (nameFragment) {
        nameFragment = nameFragment.toLowerCase();
        var result = cities.filter(function (cityRecord) {
           return cityRecord.cityLowered.indexOf(nameFragment) > -1;
        });
        if(result.length > 10){
            result = result.slice(0, 10);
        }
        return result;
    }
};
