'use strict';

import {CREDENTIALS, API_URL} from '../constants/foursquareConst';

const BASE_URL = `${API_URL}?client_id=${CREDENTIALS.CLIENT_ID}&client_secret=${CREDENTIALS.CLIENT_SECRET}&venuePhotos=1&limit=30`;

class FoursquareService {
    async getVenuesList(data = null) {
        let endpoint = '';
        let path = '';

        if (data instanceof Object) {
            Object.keys(data).map(function (key) {
                if (data[key] instanceof Array) {
                    data[key] = data[key].join(',');
                }
                endpoint += `&${key}=${data[key]}`;
            });
        } else {
            throw new Error('Wrong data parameter in request call');
        }
        path = `${BASE_URL}${endpoint}&v=${this._getApiVersion()}`;

        let response = await fetch(path);
        let venues = await response.json();

        return venues.response.groups;
    }

    _getApiVersion() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return String(10000*year + 100*month + day);
    }
}

const instance = new FoursquareService();
Object.freeze(instance);

export default instance;