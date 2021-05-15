import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleListing } from '../redux/actions/listingActions';
import axios from 'axios';

const ProductPost = (props) => {
  const dispatch = useDispatch();
  const singleListing = useSelector(state => state.listingReducer.singleListing);

  useEffect(() => {
    // console.log(props.match.params.id); // listing id / mongodb ID
    axios.get(`/api/viewListings?id=${props.match.params.id}`)
      .then((response) => {
        // console.log(response.data[0]);
        dispatch(setSingleListing(response.data[0].data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div>
      <img alt="" src={singleListing.imageFile} width="500" height="auto"/>
      <h1>Title: {singleListing.title} ${singleListing.price}</h1>
      <h2>Description: {singleListing.description}</h2>
      <h3>Type: {singleListing.type}</h3>
    </div>
  );
};

export default ProductPost;