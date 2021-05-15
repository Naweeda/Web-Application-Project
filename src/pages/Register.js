import React from 'react';
import './pages.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, setConfirmPassword } from '../redux/actions/registerActions';

const Register = () => {

  const dispatch = useDispatch();
  const name = useSelector(state => state.registerReducer.name);
  const email = useSelector(state => state.registerReducer.email);
  const password = useSelector(state => state.registerReducer.password);
//   const confirmPassword = useSelector(state => state.registerReducer.confirmPassword);

  const handleClick = () => {
    const body = {
      name: name,
      email: email,
      password: password,
    };
    console.log(body);
    axios.post('/api/register', body)
    .then((res) => {
      console.log(res.data);
      // res.send(JSON.stringify(res.data));
    })
   .catch((error) => {
      console.log(error);
    });
  };

    return (
        <div className="signup">
            <div className="wrap">
                <h1>
                    Signup
                </h1>
                <br></br>
                <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" id="name-input" placeholder="Name"/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" id="email-input" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter Password"/>
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="confirm password" id="password-input" placeholder="Confirm Password"/>
                </div>
                <br></br>
                <button onClick={handleClick} type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;