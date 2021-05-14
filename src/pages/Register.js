import React from 'react';
import './pages.css';
import axios from 'axios';

const Register = () => {

  const handleClick = () => {
    const body = {
      name: document.getElementById('name-input').value,
      email: document.getElementById('email-input').value,
      password: document.getElementById('password-input').value,
    };
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
                <form>
                <h1>
                    Signup
                </h1>
                <br></br>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" placeholder="Name"/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter Password"/>
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="confirm password" className="form-control" placeholder="Confirm Password"/>
                </div>
                <br></br>
                <button onClick={handleClick} type="submit" className="btn btn-dark btn-lg btn-block">Register</button>

                </form>
            </div>
        </div>
    )
}

export default Register;