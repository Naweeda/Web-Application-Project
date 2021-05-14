import React from 'react';

const Login = () => {
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
                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            </form>
        </div>
    </div>
        
    )
}
export default Login;