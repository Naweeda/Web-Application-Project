import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
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
        console.log(email);
        const body = {
            email: email,
            password: password,
        };
        axios.post('api/login', body)
            .then((res) => {
                if ((res.data.data.email === email)) {
                    // compare login password with encrypted password from database
                    bcrypt.compare(password, res.data.data.password, function (err, isMatch) {
                        if (err) throw err;
                        if (isMatch) {
                            console.log("Password Match");
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
                        else {
                            alert("Wrong Password");
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Invalid Login!');
            });
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className="sign-in">
            <div className="wrap">
                <h1>Login</h1>
                <br></br>
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