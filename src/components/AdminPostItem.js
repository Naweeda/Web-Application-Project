import React from 'react';
import ListingCreationForm from '../components/ListingCreationForm';
// import { useDispatch, useSelector } from 'react-redux';
// import { Switch, Route, Link } from 'react-router-dom';


const AdminPostItem = () => {


    return(
        <div>
            <h1>Admin</h1>
            <h3>Post Item</h3>
            <ListingCreationForm />
        </div>
    );
};

export default AdminPostItem;