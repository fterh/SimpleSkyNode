const fs = require('fs');
const express = require('express');
const router = express.Router();

var outlook = require('./../modules/outlook');

var locationList;
fs.readFile('locationList.json', (err, data) => {
    if (err) console.log(err);
    else locationList = JSON.parse(data);
});

var outlookData = outlook.outlook.items[0];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Thunderbird: live Singapore weather',
        shortTitle: 'Thunderbird',
        locationList: locationList.locationList,
        outlookGeneralForecast: outlookData.general.forecast,
        outlookGeneralHumidityHigh: outlookData.general.relative_humidity.high,
        outlookGeneralHumidityLow: outlookData.general.relative_humidity.low
    });
});

module.exports = router;
