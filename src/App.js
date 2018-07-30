import React, { Component } from 'react';
import List from './Places';
import Map from './Map';
import InfoWindow from './InfoWindow';
import './App.css';

  var FOURSQUARE = require('react-foursquare')({
  clientID: 'VJQ1WIOBEWGD00N0YKA0NBUVZ23GJRQTVMAGVZD5J4DNYFBY',
  clientSecret: 'KTCCWMURNXNFNGXHLQJJIH1212NH0RICRLLPHDMY33ZSKZMC'
});

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  /**
   * Set markers according to passed places array
   */
  handleSetMarkers = (places) => {
    this.setState({ places });
  }

  /**
   * Handles the click on markers
   */
  handleMarkerClick = (marker) => {
    // Update places and mark the clicked one
    const places = this.state.places.map((p, index) => {
      if (index === marker) {
        p.clicked = true;
      } else {
        p.clicked = false;
      }
      return p;
    });

    // Get info details from external provider
    this.getInfo(this.state.places[marker])
      .then(fsResponse => {
        // Set state of the component
        this.setState({
          places: places,
          selectedPlace: fsResponse.response.venue
        });

        // Lock focus on newly opened modal window
        document.querySelector('.info-window').focus();
      })
      .catch(error => {
        this.showError();
        console.log(error);
      });
  }

  /**
   * Hides the modal info window and
   * mark all places not clicked
   */
  handleHidingInfoWindow = () => {
    // Update places
    const places = this.state.places.map((p, index) => {
      p.clicked = false;
      return p;
    });

    // Update component state
    this.setState({ places: places, selectedPlace: null });
  }

  /**
   * Returns promise with FOURSQUARE response
   */
  getInfo = (place) => {
    return FOURSQUARE.venues.getVenue({
      'venue_id': place.id
    })
  }

  /**
   * Shows the error modal window for 3 seconds
   * and then hide it
   */
  showError = () => {
    const block = document.querySelector('.error');
    block.style.opacity = 1;
    setTimeout(() => {
      block.style.opacity = 0;
    }, 3000);
  }

  render() {
    const placesInfo = this.state.places.map(v => {
      return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked }
    });

    return (
      <div className='app-container'>
        <List
          foursquare={FOURSQUARE}
          setMarkers={this.handleSetMarkers}
          onPlaceClick={this.handleMarkerClick} />
        <Map
          places={placesInfo}
          hideInfoWindow={this.handleHidingInfoWindow}
          onMarkerClick={this.handleMarkerClick}
          onError={this.showError}
          />
        {this.state.selectedPlace && (<InfoWindow
          place={this.state.selectedPlace}
          foursquare={FOURSQUARE}
          hideInfoWindow={this.handleHidingInfoWindow} />)}
        <div
          style={{ opacity: 0 }}
          className='error'>Something went wrong</div>
      </div>
    );
  }
}

export default App
