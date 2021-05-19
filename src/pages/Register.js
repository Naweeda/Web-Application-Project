import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, setConfirmPassword } from '../redux/actions/registerActions';
import './pages.css';

const Register = () => {

  const dispatch = useDispatch();
  const name = useSelector(state => state.registerReducer.name);
  const email = useSelector(state => state.registerReducer.email);
  const password = useSelector(state => state.registerReducer.password);
  const confirmPassword = useSelector(state => state.registerReducer.confirmPassword);

  const handleClick = () => {
    // validation logic
    if (password === confirmPassword) {
      // generate the salt for user password hash

      // appends encrypted password to form
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);

      const body = {
        name: name,
        email: email,
        password: hash,

      };
      console.log(body);
      axios.post('/api/register', body)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Password does not match.');
    }
  };
  return (
    <div className="signup">
      <div className="wrap">
        <h1>
          User Registration
                </h1>
        <br></br>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              id="name-input"
              placeholder="Name"
              onChange={e => dispatch(setName(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              id="email-input"
              placeholder="Enter email"
              onChange={e => dispatch(setEmail(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={e => dispatch(setPassword(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              id="password-input"
              placeholder="Confirm Password"
              onChange={e => dispatch(setConfirmPassword(e.target.value))}
            />
          </div>
          <br></br>
          <button onClick={handleClick} type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register;