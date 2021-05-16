import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessages } from './redux/actions/messageActions';
import './App.css';
import Admin from './pages/Admin';
import AdminPostItem from './components/AdminPostItem';
import User from './pages/User';

import ProductPost from './components/ProductPost'; // for viewing individual products

// Homework 2
// import ListingCreationForm from './components/ListingCreationForm';
// import ViewListings from './components/ViewListings';

// const Message = ({ data }) => (<div>{data}</div>);

const App = () => {
  const dispatch = useDispatch();
  // const messages = useSelector(state => state.messageReducer.messages);
  // const text = useSelector(state => state.messageReducer.text);
  // const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  React.useEffect(() => {
    axios.get('/messanger/getMessages')
      .then((res) => {
        dispatch(updateMessages(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // const onSubmit = () => {
  //   dispatch(submitMessage());
  // }

  // const handleTextChange = (e) => {
  //   dispatch(handlTextChange(e.target.value));
  // }

  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
        <div className="nav-bar">
          <Link to="/admin" className="link">Admin</Link>
          <Link to="/user" className="link">User</Link>
          <Link to="/sign-up" className="link">Register</Link>
          <Link id="login-link" to="/sign-in" className="link">Login</Link>
          {/* {!isLoggedIn && (
            <Link id="login-link" to="/sign-in" className="link">Login</Link>
          )} */}
          {/* {isLoggedIn && (
            <Link id="login-link" to="/" className="link">Logout</Link>
          )} */}
          {/* links to individual products */}
          <Route path="/product/:id" component={ProductPost} />
      </div>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route path="/sign-up"component={Register}/>
            <Route path="/sign-in"component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/adminpost" component={AdminPostItem} />
            <Route path="/user" component={User} />
            <Route path="/"component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
      {/* <div>
        <div className="message-area">
          {messages.map((message, i) => <Message key={i} data={message} />)}
        </div>
      </div>
      <div>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div className="nav-bar">
        <div>
          <Link to={"/sign-up"}>Register</Link>
          <Link to={"/sign-in"}>Login</Link>
        </div>
      </div>
      <ListingCreationForm />
      <ViewListings />
      <div className="outer">
        <div className="inner">
      <Switch>
        <Route path="/"component={Home} />
        <Route path="/sign-up"component={Register}/>
        <Route path="/sign-in"component={Login} />
      </Switch>
        </div>
        </div>
        <button onClick={onSubmit}>Send</button>
      </div> */}
      {/* <ListingCreationForm /> */}
      {/* <ViewListings /> */}
    </div>
  );
};

export default App;
