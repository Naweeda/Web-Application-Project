import React from 'react';

const Register = ({ }) => {
    return (
        <div className="signup">
            <div className="wrap">
                <form>
                <h2>
                    Signup
                </h2>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password"/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="confirm password" className="form-control" placeholder="Confirm Password"/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>

                </form>
            </div>
        </div>
    )
}

export default Register;