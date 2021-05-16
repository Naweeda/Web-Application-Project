import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleListing, setListings } from '../redux/actions/listingActions';
import { setInquiries } from '../redux/actions/inquiryActions';
import Inquiries from '../components/Inquiries';
import axios from 'axios';

const ProductPost = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState(''); // from classwork 4 to change message box
  const [setMode, setSetMode] = React.useState(false); // used for rendering for admin or user
  const singleListing = useSelector(state => state.listingReducer.singleListing);

  useEffect(() => {
    if (props.location.state.userMode === true) setSetMode(true);
    // console.log(props.match.params.id); // listing id / mongodb ID
    axios.get(`/api/viewListings?id=${props.match.params.id}`)
      .then((response) => {
        // console.log(response.data[0]);
        dispatch(setSingleListing(response.data[0].data));
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
      {setMode ? (renderUser()) : (renderAdmin())}
      <div className="form-group">
      <div class="row">
      <div class="col-25">
      <label>Title: {singleListing.title}{singleListing.price}</label>
      </div>
      <div class="col-75">
      <input type="text"  id="title" name="title"/>
      </div>
      </div>
      </div>
        
      <div className="form-group">
      <div class="row">
      <div class="col-25">
      <label>Description: {singleListing.title}{singleListing.price}</label>
      </div>
      <div class="col-75">
      <input type="text" id="description" name="description"/>
      </div>
      </div>
      </div>

    <div className="form-group">
    <div class="row">
    <div class="col-25">
    <label>Type: {singleListing.title}{singleListing.price}</label>
    </div>
    <div class="col-75">
    <input type="text" id="type" name="type"/>
    </div>
    </div>
    </div>
  </div>

  
  
  );
};

export default ProductPost;