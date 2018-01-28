
const fs = require('fs');
var express = require('express');
var router = express.Router();

var thunderbird = JSON.parse(fs.readFileSync('thunderbird.json'));



router.get('/', function(req, res, next) {
    res.render('dataStatus', {
        title: 'Thunderbird: live Singapore weather',
        data: thunderbird
    });
});

module.exports = router;
