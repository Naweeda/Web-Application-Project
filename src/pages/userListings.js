import React from 'react';
import ViewListings from '../components/ViewListings';

const userListings = () => {
    
    
    return (
        <div>
            {/* <h1>Listings</h1> */}
            <ViewListings userMode={true} />
        </div>
    );
};

export default userListings;