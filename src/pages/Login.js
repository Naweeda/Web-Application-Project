import React from 'react';
import axios from 'axios';

const Login = () => {

    const loginSubmit = () => {
        const body = {
            email: document.getElementById('email-input').value,
            password: document.getElementById('password-input').value,
        };
        axios.post('/api/login')
        .then((res) => {
            if((res.email === body.email) && (res.password === body.password)) {
            // res.send(result);
            //page redirect to home page
            } else {
            res.send('Login failed, try again.');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return ( 
        <div className="sign-in">
        <div className="wrap">
            <form>
            <h1>
                Log in
            </h1>
            <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter Password"/>
                </div>
                <br></br>
                <button onClick={loginSubmit} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            </form>
        </div>
    </div>
        
    )
}
export default Login;