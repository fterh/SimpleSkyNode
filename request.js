require('dotenv').config();

const fs = require('fs');
const a = require('axios');
const _ = require('lodash');
const moment = require('moment');
const tz = require('moment-timezone');

var requestURLs = () => {
    // this returns a JSON object of requestURLs.json
    return JSON.parse(fs.readFileSync('requestURLs.json'));
};

var dateTime = moment().tz('Singapore').format('YYYY-MM-DD')
    + 'T' + moment().tz('Singapore').format('HH:mm:ss');

var options = {
    headers: {
        'api-key': process.env.API
    },
    params: {
        date_time: dateTime
    }
};

var twoH = () => {
    return a.get(requestURLs().twoH, options);
};

var twentyfourH = () => {
    return a.get(requestURLs().twentyfourH, options);
};

var temp = () => {
    return a.get(requestURLs().temp, options);
};

var pm25 = () => {
    return a.get(requestURLs().pm25, options);
};

var psi = () => {
    return a.get(requestURLs().psi, options);
};

var rh = () => {
    return a.get(requestURLs().rh, options);
};

var uvIndex = () => {
    return a.get(requestURLs().uvIndex, options);
};

module.exports = {
    requestURLs,
    twoH,
    twentyfourH,
    temp,
    pm25,
    psi,
    rh,
    uvIndex
}
