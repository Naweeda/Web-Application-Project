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
  const confirmPassword = useSelector(state => state.registerReducer.confirmPassword);
  // const isLoggedIn = useSelector(state => state.registerReducer.isLoggedIn);


  const handleClick = () => {
    // validation logic
    if(password === confirmPassword) {
      const body ={
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
  }else {
    alert('Password does not mathc.');
  }
  };
   return (
        <div className="signup">
            <div className="wrap">
                <form>
                <h1>
                    Signup
                </h1>
                <br></br>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" placeholder="Name" onChange={e => dispatch(setName(e.target.value))}/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => dispatch(setEmail(e.target.value))}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter Password" onChange={e => dispatch(setPassword(e.target.value))}/>
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="confirm password" className="form-control" placeholder="Confirm Password" onChange={e => dispatch(setConfirmPassword(e.target.value))}/>
                </div>
                <br></br>
                <button onClick={handleClick} type="submit" className="btn btn-dark btn-lg btn-block">Register</button>

                </form>
            </div>
        </div>
    )
}

export default Register;