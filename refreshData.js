// this should run on a schedule, e.g. every 1 minute

const fs = require('fs');
const _ = require('lodash');

const request = require('./request')
const locationDropdown = require('./locationDropdown');

var requestURLs = request.requestURLs();

async function goThunderbird() {
    try {
        return {
            twoH: await request.twoH(),
            twentyfourH: await request.twentyfourH(),
            temp: await request.temp(),
            pm25: await request.pm25(),
            psi: await request.psi(),
            rh: await request.rh(),
            uvIndex: await request.uvIndex()
        };
    } catch (err) {
        console.log(err);
    }
}

goThunderbird().then((response) => {
    var thunderbird = {};
    _.forEach(response, (value, key) => {
        thunderbird[key] = value.data;
    });
    fs.writeFileSync('thunderbird.json', JSON.stringify(thunderbird));
});
