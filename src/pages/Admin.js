import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './pages.css';


const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <div className="admin-navbar">
        <Link to="/adminpost"className="link">Post Item</Link>
        <Link to="/listings" className="link">All Listings</Link>
      </div>
      <br></br>
    </div>
  );
};

export default Admin;