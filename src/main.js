import './index.scss';

import getCurrentLocation from './libs/location';
import foursquareService from './services/foursquareService';

let filters = {};

const renderVenues = (data = {}) => {
    getCurrentLocation()
        .then((location) => {
            return foursquareService.getVenuesList(Object.assign({ll: location}, data))
        })
        .then((venues) => {
            let venuesListContent = getVenuesListContent(venues);
            document.querySelector('#recommendationsList').innerHTML = venuesListContent;
        })
        .catch((error) => {
            alert(error);
        });
};


const getVenuesListContent = (venues) => {

    if (venues[0].items.length === 0) {
        return document.getElementById('noVenuesItem').innerHTML;
    }

    let venueItemTmpl = document.getElementById('venueItem').innerHTML;
    let venueListHtml = '';

    venues[0].items.forEach((item) => {
        let venue = item.venue;
        let venueMainPhoto = venue.photos.count === 0 ? '' : venue.photos.groups[0].items[0];
        let tmplData = {
            TMPL_VENUE_URL: venue.url || '#',
            TMPL_VENUE_NAME: venue.name,
            TMPL_VENUE_SCORE_COLOR: `#${venue.ratingColor}`,
            TMPL_VENUE_SCORE: venue.rating,
            TMPL_VENUE_ADDRESS: venue.location && venue.location.formattedAddress.join(', '),
            TMPL_VENUE_CATEGORY: venue.categories && venue.categories[0] && venue.categories[0].name,
            TMPL_VENUE_PRICE: (venue.price && venue.price.message) || '-',
            TMPL_VENUE_PHOTO: venueMainPhoto ? `${venueMainPhoto.prefix}300x300${venueMainPhoto.suffix}` : ''
        };
        let itemTemplate = venueItemTmpl;
        Object.keys(tmplData).map(function (key) {
            itemTemplate = itemTemplate.replace(key, tmplData[key]);
        });
        venueListHtml += itemTemplate;
    });

    return venueListHtml;
};

const initFilters = () => {
    document.querySelector('#filtersList').addEventListener("click",function(e) {
        let element = e.target;
        if (!element || !element.matches(".venueFilterItem")) {
            return;
        }

        let filterType = element.dataset.type;
        let filterName = element.getAttribute("name");
        let filterValue = element.getAttribute("value");

        if (!element.checked) {
            if (filterType === 'single') {
                delete filters[filterName]
            } else {
                const index = filters[filterName].indexOf(filterValue);
                filters[filterName].splice(index, 1);
            }
            renderVenues(filters);
            return;
        }

        if (!filters[filterName]) {
            filters[filterName] = filterType === 'single' ? filterValue : [filterValue];
        } else {
            filterType === 'single' ? filters[filterName] = filterValue : filters[filterName].push(filterValue);
        }
        renderVenues(filters);
    });
};

renderVenues();
initFilters();


