const fs = require('fs');

var outlook = JSON.parse(fs.readFileSync('thunderbird.json')).twentyfourH;

module.exports = { outlook }
