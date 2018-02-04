// gets location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationAcquired, handleError);
    } else {
        errorMessage('error', 'Error: your browser does not support geolocation :( \
            <br /> Please select it manually.');
        //alert('Geolocation is not supported by this browser; please select location manually');
    }
}

// error handling
function handleError(error) {
    errorMessage('error', 'Error: I can\'t get your location :( <br />\
        Please select it manually.');
    // switch (error.code) {
    //     case error.PERMISSION_DENIED:
    //         alert('Unable to get your location (permission denied); please select location manually');
    //         break;
    //     case error.POSITION_UNAVAILABLE:
    //         alert('Unable to get your location (position unavailable); please select location manually');
    //         break;
    //     case error.TIMEOUT:
    //         alert('Unable to get your location (timeout); please select location manually');
    //         break;
    //     case error.UNKNOWN_ERROR:
    //         alert('Unknown error; please select location manually');
    // }
}

// location acquired
function locationAcquired(position) {
    postLocation(position, false);
}

// user selects location
function selectLocation(object) {
    // updateUI('userLocation', object.value);
    var position = {
        lat: object.options[object.selectedIndex].dataset.lat,
        lng: object.options[object.selectedIndex].dataset.lng
    }
    postLocation(position, true);
}

// POSTs location
function postLocation(position, userSelect) {
    url = window.location + 'postlocation';
    if (userSelect) {
        var coordinates = {
            'lat': position.lat,
            'lng': position.lng
        }
    } else {
        var coordinates = {
            'lat': position.coords.latitude,
            'lng': position.coords.longitude
        }
    }

    axios.post(url, coordinates).then((response) => {
        var rh = ['rh', `humidity: ${response.data.rh.value} %`, true, 'fas fa-tint'];
        var temp = ['temp', response.data.temp.value + '\u00B0C', true, 'fas fa-thermometer-half'];
        var twentyfour
        var twoH = ['twoH', response.data.twoH.forecast, true, 'fas fa-cloud'];
        var userLocation = ['userLocation', response.data.twoH.area, true, 'fas fa-location-arrow'];
        var uvIndex = ['uvIndex', `UV index: ${response.data.uvIndex.value}`, true, 'fas fa-sun'];

        updateUI([temp, twoH, rh, uvIndex, userLocation]);
    });
}
