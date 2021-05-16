import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
  return (
    <div>
      <h1>User</h1>
      <div className="user-navbar">
        <Link to="/userlistings" className="link">All Listings</Link>
      </div>
      <br></br>
    </div>
  );
};

export default User;