# Foursquare Api

Get the list of venues around the users current location.
Give user the ability to adjust the search based on the available filters

## Overview

### Web Application build flow
* Request users current location
* Get the list of venues based on created Foursquare Application credentials
* Show the list of available venues
* To adjust users search, predefined filters available

### Application structure
* libs - utility, helpers
* services - remote calls services, with are doing the API requests
* constants - all defined Application constants
* main.js - main JS file that initiate all functionality

Application is done with Vanilla JS based on ES6 standart.
Build with webpack + babel.

## Running locally

To run the project on your local simple run the following command form the project root

```
npm run build
```

index.html would be available under the build folder.

For the dev purposes watch script is in place by running

```
npm run watch
```

## Deployment

Web Application is deployed as a static content under the AWS S3 bucket.
AWS CodeBuild service available to build the latest changes for the bucket.
Deployed version can be found by the URL:

[Foursquare Venues](https://s3-eu-west-1.amazonaws.com/foursquare-venues/index.html)

## Future improvements
* create more environment to build/watch - local/dev/staging/production
* errors handling improvements
* when Applicaiton will grow split the html/js/css per components, now only the main allocated under src
* use more filters, render the recommended dynamic filters from the Foursquare API
* show more Venues functionality with the offset parameter
* use the template engine like handlebars or pug. If Application will grow switch to the React framework for example
* show more venue details
* responsive mobile friendly layout
* nicer look and feel