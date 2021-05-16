import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import ViewListings from '../components/ViewListings';

const Message = ({ data }) => (<div>{data}</div>);

const Listings = () => {


    return (
        <div>
            {/* <h1>All Listings</h1> */}
            <ViewListings />
        </div>
    )
};

export default Listings;