import React from 'react';
import axios from 'axios';
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { updateMessages } from './redux/actions/messageActions';
import './App.css';
import Admin from './pages/Admin';
import AdminPostItem from './components/AdminPostItem';
import User from './pages/User';

// Homework 2
// import ListingCreationForm from './components/ListingCreationForm';
// import ViewListings from './components/ViewListings';

// const Message = ({ data }) => (<div>{data}</div>);

const App = () => {
  const dispatch = useDispatch();
  // const messages = useSelector(state => state.messageReducer.messages);
  // const text = useSelector(state => state.messageReducer.text);

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
          <Link to="/sign-in" className="link">Login</Link>
      </div>
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
      <ViewListings /> */}
    </div>
  );
};

export default App;
