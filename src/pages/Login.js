import React from 'react';
import axios from 'axios';
import {useDispatch, useSelector } from 'react-redux';
import {setEmail, setPassword, setIsLoggedIn } from '../redux/actions/loginActions';
import { Redirect } from 'react-router';

const Login = () => {

    const dispatch = useDispatch();
    const email = useSelector(state => state.loginReducer.email);
    const password = useSelector(state => state.loginReducer.password);
    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);


    const handleClick = () => {
        const body ={
            email: email,
            password: password,
        }
        console.log(body);
        axios.post('api/login', body)
        .then((res) => {
        if((res.email === body.email) && (res.password === body.password)) {
          dispatch(setIsLoggedIn(true));
        }else {
            res.send('Login failed! try again'); 
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

if(isLoggedIn) {
    return <Redirect to="/"/>
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
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => dispatch(setEmail(e.target.value))}/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter Password" onChange={e => dispatch(setPassword(e.target.value))}/>
                </div>
                <br></br>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleClick}>Sign in</button>
            </form>
        </div>
    </div>
        
    )
}
export default Login;