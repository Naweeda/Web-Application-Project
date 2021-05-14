import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import ViewListings from '../components/ViewListings';
import ListingCreationForm from '../components/ListingCreationForm';
import Inquiries from '../components/Inquiries';
import { updateMessages, handlTextChange, submitMessage } from '../redux/actions/messageActions';

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
        <Link to="/adminpost">Post Item</Link>
      </div>
      <br></br>
      <div className="message-area">
        {messages.map((message, i) => <Message key={i} data={message} />)}
      </div>
      <div>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      <div>
        <button onClick={onSubmit}>Send</button>
      </div>
      {/* <ListingCreationForm /> */}
      <Inquiries />
      <ViewListings />
    </div>
  );
};

export default Admin;