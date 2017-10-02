import React, { Component } from 'react';
import { Venue } from './Venue';
import { Search } from './Search';
import 'whatwg-fetch';

class App extends Component {

  constructor() {

    super();

    this.state = {
      venues: []
    };

  }

  handleSubmit(query) {
    this.getVenues(query);
  }

  componentDidMount() {
    this.getVenues('Pubs');
  }

  getLocation(callback) {
    navigator.geolocation.getCurrentPosition(function(location) {
      callback(location.coords.latitude + ',' + location.coords.longitude)
    })
  }

  getVenues(query) {

    let setVenueState = this.setState.bind(this);

    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    this.getLocation(function (latlong) {

      const params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        limit: 100,
        query: query,
        v: '20130619',
        ll: latlong
      };

      fetch(venuesEndpoint + new URLSearchParams(params), {
        method: 'GET'
      }).then(response => response.json()).then(response => {
        setVenueState({venues: response.response.groups[0].items});
      });

    });

  }

  render() {

    var venueList = this.state.venues.map((item, i) =>
      <Venue key={i} name={item.venue.name}/> //Create a new "name attribute"
    );

    return (
      <div>
        <Search onSubmit={(value)=>this.handleSubmit(value)}/>
        <ul>
          {venueList}
        </ul>
      </div>
    );
  }

}

export default App;
