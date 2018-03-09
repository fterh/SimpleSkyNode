const fs = require('fs');

var outlook = JSON.parse(fs.readFileSync('thunderbird.json')).twentyfourH.items[0];
var periods = outlook.periods;

// Replaces period time starts and ends with formatted strings
function toPrettyHour(h) {
    if (h == 0) { return '12am'; }
    else if (h < 12) { return h.toString() + 'am'; }
    else if (h == 12) { return '12pm'; }
    return (h-12).toString() + 'pm';
};

periods.forEach((elem) => {
    var start = new Date(elem.time.start)
    var end = new Date(elem.time.end)

    elem.time.start = toPrettyHour(start.getHours());
    elem.time.end = toPrettyHour(end.getHours());
});

module.exports = { outlook }
