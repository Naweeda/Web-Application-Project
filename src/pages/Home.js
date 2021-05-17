import React from 'react';
import './pages.css';
import './map.css';

import currentUser from '../components/currentUser'; // gets current user

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            {currentUser.getUser().isLoggedIn && (
                <h5>Greetings, {currentUser.getUser().name}!</h5>
            )}

            <div class="row">
                <div class="col-sm-6">
                    <div class="card w-100">
                    <div class="card-body">
                        <h6 class="card-title">Buy</h6>
                        <p class="card-text">See recent listings</p>
                        <a href="/userlistings" class="btn btn-primary">View items</a>
                    </div>
                    </div>
                </div>

            <div class="col-sm-6">
                <div class="card w-100">
                <div class="card-body">
                    <h6 class="card-title">Sell</h6>
                    <p class="card-text">Post an item here</p>
                    <a href="/adminpost" class="btn btn-primary">Post an item</a>
                </div>
                </div>
            </div>
            </div>

            <h4>
                About
            </h4>
            <p>
                Create listings, view listings and chat with listing posters! This site is a chatty way to buy and sell items.
            </p>

            <br></br>
            <h4>Our Location</h4>
            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe width="319" height="333" id="gmap_canvas" src="https://maps.google.com/maps?q=san%20francisco%20state&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                        </iframe><a href="https://putlocker-is.org"></a>
                        <br></br>
                        <a href="https://www.embedgooglemap.net"></a>
                </div>
            </div>
            <br></br>
        </div>
    )
}
export default Home;