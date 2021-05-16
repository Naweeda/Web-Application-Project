import React from 'react';
import ViewListings from '../components/ViewListings';

const userListings = () => {
    return (
        <div>
            <ViewListings userMode={true} />
        </div>
    );
};

export default userListings;