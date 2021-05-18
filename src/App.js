import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPostItem from './components/AdminPostItem';
import Listings from './pages/Listings';
import userListings from './pages/userListings';
import ProductPost from './components/ProductPost'; // for viewing individual products
import currentUser from './components/currentUser'; // sets current user for session
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);

  React.useEffect(() => {
    if (isLoggedIn) window.location.reload(); // cheap way to get website to see current user
    console.log(currentUser.getUser());
  }, [isLoggedIn]);

  const logOut = () => {
    currentUser.setUserLogout();
    window.location.reload(); // used to refresh buttons
  }

  return (
    
    <div className="App">
      <div className="outer">
       <br></br>
        <div className="inner">
          <div className="nav-bar">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-link" href="#"><Link to="/" className="link">Home</Link></a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    {/* This page replaced Admin.js */}
                    <a class="nav-link" href="#"><Link to="/adminpost" className="link">Post Item</Link> <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    {/* This page replaced User.js since we don't need this anymore*/}
                    <a class="nav-link" href="#"><Link to="/userlistings" className="link">Listings</Link></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">{!currentUser.getUser().isLoggedIn && (<Link to="/sign-up" className="link">Register</Link>)}</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">{!currentUser.getUser().isLoggedIn && (<Link id="login-link" to="/sign-in" className="link">Login</Link>)}{currentUser.getUser().isLoggedIn && (<Link id="login-link" to="" onClick={logOut} className="link">Log Out</Link>)}</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <br></br>

      <div className="outer">
        <div className="inner">
          <Switch>
            {/* links to individual products */}
            <Route path="/product/:id" component={ProductPost} />
            <Route path="/sign-up" component={Register} />
            <Route path="/sign-in" component={Login} />
            <Route path="/adminpost" component={AdminPostItem} />
            <Route path="/userlistings" component={userListings} />
            <Route path="/listings" component={Listings} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default App;
