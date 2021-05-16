import React from 'react';
import { Link } from 'react-router-dom'; // links to individual product pages
import './Listing.css';

// a single listing
const Listing = ({ listing, userMode }) => {

  // used for rendering for admin or user
  let setMode = false;
  if (userMode === true) setMode = true;

  // holds listing prop variables
  let singleListing = {
    description: '',
    type: '',
    price: '',
    title: '',
    imageFile: '',
    id: '',
    mongoID: ''
  };

  // if listing is not undefined, set variable to passed in prop variables
  if (listing !== undefined) {
    singleListing = {
      description: listing.data.description,
      type: listing.data.type,
      price: listing.data.price,
      title: listing.data.title,
      imageFile: listing.data.imageFile,
      id: listing.data.id,
      mongoID: listing._id
    };
  }

  // formatted and added listing image
  return (
    <Link className='link' to={{ pathname: `/product/${singleListing.mongoID}`, state: { userMode: setMode, } }}>
      <div className="card">
        {singleListing.imageFile ? <img className="cardImage border border-light" alt="" src={singleListing.imageFile} /> : <img className="cardImage border border-light" alt="" src='https://csc667.s3-us-west-1.amazonaws.com/default-image.jpg' />}
        <br></br>
        <h5 id="listingLink">{singleListing.title}</h5>
        <h6 id="listingLink">${singleListing.price}</h6>
      </div>
    </Link>
  );
};

export default Listing;