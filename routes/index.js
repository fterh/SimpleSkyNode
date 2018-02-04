const fs = require('fs');
var express = require('express');
var router = express.Router();

// var locationList = JSON.parse(fs.readFileSync('locationList.json'));
var locationList;
fs.readFile('locationList.json', (err, data) => {
    if (err) console.log(err);
    else locationList = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Thunderbird: live Singapore weather',
        shortTitle: 'Thunderbird',
        locationList: locationList.locationList
    });
});

module.exports = router;
