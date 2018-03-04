const fs = require('fs');
var express = require('express');
var router = express.Router();
const _ = require('lodash');
const geodist = require('geodist');

var thunderbird = JSON.parse(fs.readFileSync('thunderbird.json'));

var calculateDistance = (userLocation, targetLocation) => {
    let dist = geodist({
        lat: targetLocation.latitude,
        lon: targetLocation.longitude
    }, {
        lat: userLocation.lat,
        lon: userLocation.lng
    });

    return dist;
};

var calculateDistances = (userLocation) => {
    // rh
    _.forEach(thunderbird.rh.metadata.stations, (value, key) => {
        thunderbird.rh.metadata.stations[key]['distFromUser'] = calculateDistance(userLocation, value.location);
    });

    // temp
    _.forEach(thunderbird.temp.metadata.stations, (value, key) => {
        thunderbird.temp.metadata.stations[key]['distFromUser'] = calculateDistance(userLocation, value.location);
    });

    // twoH
    _.forEach(thunderbird.twoH.area_metadata, (value, key) => {
        thunderbird.twoH.area_metadata[key]['distFromUser'] = calculateDistance(userLocation, value.label_location);
    });
};

var calculateClosest = (iterable) => {
    var minKey;
    var minDist;
    _.forEach(iterable, (value, key) => {
        if (key === 0) {
            minKey = key;
            minDist = value.distFromUser;
        }
        else if (value.distFromUser < minDist) {
            minKey = key;
            minDist = value.distFromUser;
        }
    });
    return minKey;
};

var getClosestData = () => {
    var minKey = {};
    minKey.twoH = calculateClosest(thunderbird.twoH.area_metadata);
    minKey.temp = calculateClosest(thunderbird.temp.metadata.stations);
    minKey.rh = calculateClosest(thunderbird.rh.metadata.stations);

    return {
        twoH: thunderbird.twoH.items[0].forecasts[minKey.twoH],
        temp: thunderbird.temp.items[0].readings[minKey.temp],
        rh: thunderbird.rh.items[0].readings[minKey.rh],
        uvIndex: thunderbird.uvIndex.items[0].index[0]
    };
};

router.get('/', function(req, res, next) {
    res.send('Well well well, what do we have here?');
});

router.post('/', function(req, res, next) {
    calculateDistances(req.body);
    res.send(getClosestData());
});

module.exports = router;
