import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ViewListings from '../components/ViewListings';
import { handlTextChange, submitMessage } from '../redux/actions/messageActions';
import './pages.css';

const Message = ({ data }) => (<div>{data}</div>);

const Admin = () => {

  const dispatch = useDispatch();
  const messages = useSelector(state => state.messageReducer.messages);
  const text = useSelector(state => state.messageReducer.text);

  const onSubmit = () => {
    dispatch(submitMessage());
  }

  const handleTextChange = (e) => {
    dispatch(handlTextChange(e.target.value));
  }

  return (
    <div>
      <h1>Admin</h1>
      <div className="admin-navbar">
        <Link to="/adminpost"className="link">Post Item</Link>
        <Link to="/listings" className="link">All Listings</Link>
      </div>
      <br></br>
    </div>
  );
};

export default Admin;