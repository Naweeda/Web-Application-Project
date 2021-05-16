import React from 'react';
import './pages.css';
import './map.css';
import currentUser from '../components/currentUser'; // gets current user

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            {currentUser.getUser().isLoggedIn && (
                <h3>Greetings, {currentUser.getUser().name}!</h3>
            )}
            <h4>Our Location</h4>
            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe width="319" height="333" id="gmap_canvas" src="https://maps.google.com/maps?q=san%20francisco%20state&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                        </iframe><a href="https://putlocker-is.org"></a>
                        <br></br>
                        
                        <a href="https://www.embedgooglemap.net"></a>
                </div>
            </div>
        </div>
    )
}
export default Home;