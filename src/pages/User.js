import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ViewListings from '../components/ViewListings';
import { handlTextChange, submitMessage } from '../redux/actions/messageActions';

const Message = ({ data }) => (<div>{data}</div>);

const User = () => {
  
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
      <h1>User</h1>
      <div className="user-navbar">
        <Link to="/userlistings" className="link">All Listings</Link>
      </div>
      <br></br>
      {/* <div className="message-area">
        {messages.map((message, i) => <Message key={i} data={message} />)}
      </div>
      <div>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      <div>
        <button onClick={onSubmit}>Send</button>
      </div> */}
      {/* <ViewListings userMode={true} /> */}
    </div>
  );
};

export default User;