import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setIsLoggedIn } from '../redux/actions/loginActions';
import { Redirect } from 'react-router';

import currentUser from '../components/currentUser'; // sets current user for session

const Login = () => {

    const dispatch = useDispatch();
    const email = useSelector(state => state.loginReducer.email);
    const password = useSelector(state => state.loginReducer.password);
    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);


    const handleClick = () => {
        const body = {
            email: email,
            password: password,
        };
        axios.post('api/login', body)
            .then((res) => {
                if ((res.data.data.email === email) && (res.data.data.password === password)) {
                    dispatch(setIsLoggedIn(true));

                    // sets logged in user
                    const userForm = {
                        name: res.data.data.name,
                        email: res.data.data.email,
                        id: res.data._id,
                        isLoggedIn: true
                    };
                    currentUser.setUser(userForm);
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Invalid Login!');
            });
    }

    if (isLoggedIn) {
        // document.getElementById('login-link').value = 'Logout';
        return <Redirect to="/" />;
    }
    return (
        <div className="sign-in">
            <div className="wrap">
                <h1>Log in</h1>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        onChange={e => dispatch(setEmail(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={e => dispatch(setPassword(e.target.value))}
                    />
                </div>
                <br></br>
                <button
                    type="submit"
                    className="btn btn-dark btn-lg btn-block"
                    onClick={handleClick}
                >
                    Sign in
            </button>
            </div>
        </div>
    );
}
export default Login;