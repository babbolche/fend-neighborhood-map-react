# Neighboorhood Map React Project
This is the last project for the Udacity Front End Developer Nanodegree Program. It shows some places in my city Sofia. This is a single page application bootstrapped with [Create-react-app](https://github.com/facebook/create-react-app) that displays a Google Map of an area and various points of interest. Users can search all included landmarks and when a location is selected an additional information window shows a landmark's infoWindow with data from the FourSquare APIs.

## How to install
- clone this repository to your local machine
- make sure you have [node.js](https://nodejs.org/en/) installed
- then `cd` into project directory
- run `npm install` or `yarn install` to install all dependencies
- run `npm start` or `yarn start` to launch the project in your browser

### Production mode
The service workers for this app will only cache the site when it is in production mode. As the current application is running in development mode, if you want you can change the enviroment to production mode. For do this you should execute the following commands:
`npm run build`
`npm install -g serve`
`serve -s`
The application is running at: [http://localhost:5000/](http://localhost:5000/)

## Attributions
- [React](https://reactjs.org/)
- [Google maps react](https://www.npmjs.com/package/google-maps-react)
- [Create react app](https://github.com/facebook/create-react-app)
- [Google maps API](https://developers.google.com/maps/documentation/)
- [Foursquare API](https://developer.foursquare.com/docs)
