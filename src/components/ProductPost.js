import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleListing, setListings } from '../redux/actions/listingActions';
import { setInquiries } from '../redux/actions/inquiryActions';
import Inquiries from '../components/Inquiries';
import axios from 'axios';
import currentUser from './currentUser'; // gets current user

// sample chat box
import '../pages/pages.css';
import { handlTextChange, submitMessage } from '../redux/actions/messageActions';
const Message = ({ data }) => (<div>{data}</div>);

const ProductPost = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState(''); // from classwork 4 to change message box
  const singleListing = useSelector(state => state.listingReducer.singleListing);
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);

  // sample chat box
  const messages = useSelector(state => state.messageReducer.messages);
  const text = useSelector(state => state.messageReducer.text);
  const onSubmit = () => {
    dispatch(submitMessage(props.match.params.id, currentUser.getUser().name)); // pass listing id
  }
  const handleTextChange = (e) => {
    dispatch(handlTextChange(e.target.value));
  }

  useEffect(() => {
    // console.log(props.match.params.id); // listing id / mongodb ID
    axios.get(`/api/viewListings?id=${props.match.params.id}`)
      .then((response) => {
        console.log(response.data.data);
        dispatch(setSingleListing(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  // sends the inquiry using api call
  const sendInquire = () => {
    const formData = {
      message: message,
      buyerID: '' // get id from logged in user
    };

    console.log(formData);

    axios.post(`/messanger/makeInquiry?listingId=${props.match.params.id}`, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if usermode is user, render text box for inquiring about listing
  const renderUser = () => {
    return (
      <div>
        <textarea
          type="text"
          id={singleListing.id}
          onChange={e => setMessage(e.target.value)}
          value={message} />
        <button className="submit" onClick={sendInquire}>Send</button>
      </div>
    );
  };

  // deletes a listing and sets the array of listings to the new array
  const deleteListing = () => {
    axios.get(`/api/deleteListing?id=${props.match.params.id}`)
      .then((response) => {
        console.log(response);
        dispatch(setListings(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // gets inquiries from a listing and sets it to array in reducer
  const viewInquire = () => {
    axios.get(`/messanger/getInquiries?listingId=${props.match.params.id}`)
      .then((response) => {
        console.log(response);
        dispatch(setInquiries(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // renders buttons for admin
  const renderAdmin = () => {
    return (
      <div>
        <Link to='/'><button onClick={deleteListing}>Delete</button></Link>
        <button onClick={viewInquire}>View Inquiries</button>
        <Inquiries />
      </div>
    );
  };

  return (
    <div className="Posting">
      <img alt="" src={singleListing.imageFile} width="500" height="auto" />
      {currentUser.getUser().isLoggedIn && (
        <div>
        <div className="message-area">
          {messages.map((message, i) => <Message key={i} data={message} />)}
        </div>
        <div>
          <input type="text" value={text} onChange={handleTextChange} />
        </div>
        <div>
          <button onClick={onSubmit}>Send</button>
        </div>
      </div>
      )}
      {(currentUser.getUser().id === singleListing.userId) ? (renderAdmin()) : (renderUser())}

      <div className="form-group">
        <div class="row">
          <div class="col-25">
            <label>Title: {singleListing.title}</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div class="row">
          <div class="col-25">
            <label>Price: ${singleListing.price}</label>
          </div>
        </div>
      </div>
        
      <div className="form-group">
        <div class="row">
          <div class="col-25">
            <label>Description: {singleListing.description}</label>
          </div>
        </div>
      </div>

    <div className="form-group">
      <div class="row">
        <div class="col-25">
          <label>Type: {singleListing.type}</label>
        </div>
      </div>
    </div>

    <div className="form-group">
      <div class="row">
        <div class="col-25">
          <label>Owner: {singleListing.name}</label>
        </div>
      </div>
    </div>

    <div className="form-group">
      <div class="row">
        <div class="col-25">
          <label>Email: {singleListing.email}</label>
        </div>
      </div>
    </div>

  </div>

  
  
  );
};

export default ProductPost;