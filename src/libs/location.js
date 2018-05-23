'use strict';

const CURRENT_LOCATION = 'current-location';

const getCurrentLocation = () => {

    return new Promise((resolve, reject) => {
        let currentLocation = localStorage.getItem(CURRENT_LOCATION);

        if (currentLocation) {
            resolve(currentLocation);
            return;
        }

        window.navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let currentLocation = `${latitude},${longitude}`;

            localStorage.setItem(CURRENT_LOCATION, currentLocation);

            resolve(currentLocation);

        }, () => {
            reject('We could not get your location. Please allow sharing your location and try again.');
        });
    });
};

export default getCurrentLocation;