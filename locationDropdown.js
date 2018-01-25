// generate location dropdown list
// Important note: this file/function is not called by anything right now!

const _ = require('lodash');

function generate(data) {
    var locationList = '<option>Select</option>';
    _.forEach(data.area_metadata, area => {
        locationList += `<option value="${area.name}" data-lat="${area.label_location.latitude}" data-long="${area.label_location.longitude}">${area.name}</option>`;
    });
    return locationList;
}

module.exports = {
    generate
}
