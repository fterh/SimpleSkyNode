if (storageAvailable('sessionStorage') && window.location.pathname != '/data-status') {
    var set = sessionStorage.getItem('set');

    if (set) {
        var temp = JSON.parse(sessionStorage.getItem('temp'));
        var twoH = JSON.parse(sessionStorage.getItem('twoH'));
        var rh = JSON.parse(sessionStorage.getItem('rh'));
        var uvIndex = JSON.parse(sessionStorage.getItem('uvIndex'));
        var userLocation = JSON.parse(sessionStorage.getItem('userLocation'));
        initializeStructure();
        loadPage();
        updateUI([temp, twoH, rh, uvIndex, userLocation]);
    }
}

function sessionRemember(data) {
    console.log(data); // to remove

    sessionStorage.setItem('set', true);

    data.forEach((e) => {
        var name = e.name;
        var value = JSON.stringify(e);
        sessionStorage.setItem(name, value);
    });
}

function sessionForget() {
    sessionStorage.clear();
}

// Code credit: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
