import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../redux/actions/listingActions';
import Listing from './Listing';
import axios from 'axios';

// a list of all the listings
// gets a prop from component call
const ViewListings = (props) => {
  const dispatch = useDispatch(); // alerts redux that an actions has changed
  const listings = useSelector(state => state.listingReducer.listings);

  // Similar to componentDidMount and componentDidUpdate
  // on page load, populate listings area in reducer with array from api call
  useEffect(() => {
    axios.get('/api/viewListings')
      .then((response) => {
        const itemsArray = response.data;
        dispatch(setListings(itemsArray));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div>
      <h1>ViewListings</h1>
      {/* Loops through received object listings priting out the component for a single listing */}
      {Object.keys(listings).map((keyName, i) => (
        <Listing
          key={i}
          userMode={props.userMode}
          listing={listings[keyName]}
        ></Listing>
      ))}
    </div>
  );
};

export default ViewListings;