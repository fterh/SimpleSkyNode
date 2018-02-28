// gets location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationAcquired, handleError);
    } else {
        errorMessage('error', 'Error: your browser does not support geolocation :( \
            <br /> Please select it manually.');
    }
}

// loads page, unhides hidden page elements
function loadPage() {
    var toUnhide = ['selectLocation', 'footer'];
    toUnhide.forEach((element) => {
        document.getElementById(element).classList.add('show');
        document.getElementById(element).classList.remove('hidden');
    });
}

// show footer if page is /data-status
if (window.location.pathname == '/data-status') {
    document.getElementById('footer').classList.add('show');
    document.getElementById('footer').classList.remove('hidden');
}

// error handling
function handleError(error) {
    errorMessage('error', 'Error: I can\'t get your location :( <br />\
        Please select it manually.');
    loadPage();
}

// location acquired
function locationAcquired(position) {
    // unhides page elements
    loadPage();
    postLocation(position, false);
}

// user selects location
function selectLocation(object) {
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
        var rh = {
            name: 'rh',
            value: `humidity: ${response.data.rh.value}%`,
            iconClass: 'fas fa-tint',
            customClass: 'inline',
            renderTo: 'block-2'
        }
        var temp = {
            name: 'temp',
            value: `${response.data.temp.value}\u00B0C`,
            customClass: 'block',
            renderTo: 'block-1'
        }
        var twentyfour = {}
        var twoH = {
            name: 'twoH',
            value: response.data.twoH.forecast,
            customClass: 'block',
            renderTo: 'block-1'
        }
        var userLocation = {
            name: 'userLocation',
            value: response.data.twoH.area,
            iconClass: 'fas fa-location-arrow',
            renderTo: 'userLocationWrapper'
        }
        var uvIndex = {
            name: 'uvIndex',
            value: `UV index: ${response.data.uvIndex.value}`,
            iconClass: 'fas fa-sun',
            customClass: 'inline',
            renderTo: 'block-2'
        }
        // checks if initializeStructure has been called using #block-1
        if (!document.getElementById('block-1')) {
            initializeStructure();
        }
        updateUI([temp, twoH, rh, uvIndex, userLocation]);
        sessionRemember([temp, twoH, rh, uvIndex, userLocation]);
    });
}
