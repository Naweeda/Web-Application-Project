import React, { useEffect } from 'react';
import './ProductPost.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleListing, setListings } from '../redux/actions/listingActions';
import { setInquiries } from '../redux/actions/inquiryActions';
import { updateMessages } from '../redux/actions/messageActions';
import Inquiries from '../components/Inquiries';
import axios from 'axios';
import './ChatBubble.css'; // for chat
import currentUser from './currentUser'; // gets current user

// sample chat box
import '../pages/pages.css';
import { handlTextChange, submitMessage } from '../redux/actions/messageActions';
const Message = ({ data }) => (
  <p class="from-them">{data}</p>
); // message tag from chat box?

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

    // gets messages
    axios.get(`/messanger/getMessages?listingId=${props.match.params.id}`)
      .then((res) => {
        dispatch(updateMessages(res.data.map(r => r.data))); // changed to explicitly get message
        console.log(res.data.map(r => r));
      })
      .catch((e) => {
        console.log(e);
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
      // <div>
      //   <textarea
      //     type="text"
      //     id={singleListing.id}
      //     onChange={e => setMessage(e.target.value)}
      //     value={message} />
      //   <button className="submit" onClick={sendInquire}>Send</button>
      // </div>
      <div></div>
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

  const renderChat = () => {
    return (
      <div>
        {currentUser.getUser().isLoggedIn && (
          <div>
            <div class="imessage">
              {console.log(messages)}
              {messages.map((message, i) => <Message key={i} data={message} />)}
            </div>
            <div>
              <input type="text" value={text} onChange={handleTextChange} />
              <button class="btn btn-primary btn-sm" onClick={onSubmit}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // renders buttons for admin
  const renderAdmin = () => {
    return (
      <div>
        <Link to='/'><button onClick={deleteListing}>Delete</button></Link>
        {/* <button onClick={viewInquire}>View Inquiries</button>
        <Inquiries /> */}
      </div>
    );
  };

  const handleClick = () => {
    let x = document.getElementById("showChat");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  return (

    <div class="Cards">
      <div class="row">
        <div class="column">
          {singleListing.imageFile ? <img alt="" src={singleListing.imageFile} width="200" height="auto" /> : <img alt="" src='https://csc667.s3-us-west-1.amazonaws.com/default-image.jpg' width="200" height="auto" />}
        </div>
        <div class="column">
          <h13 class="h13" style={{ float: 'left', paddingLeft: '10px', paddingRight: '500px' }} > Title: {singleListing.title}</h13>
          <h13 class="h13" style={{ float: 'left', paddingLeft: '10px', paddingRight: '500px' }} > Price: ${singleListing.price}</h13>
          <h13 class="h13" style={{ float: 'left', paddingLeft: '10px', paddingRight: '500px' }} > Description: {singleListing.description}</h13>
          <h13 class="h13" style={{ float: 'left', paddingLeft: '10px', paddingRight: '500px' }} > Type: {singleListing.type}</h13>
          <h13 class="h13" style={{ float: 'left', paddingLeft: '10px', paddingRight: '500px' }} > Owner: {singleListing.owner}</h13>
          <h13 class="h13" style={{ float: 'left', paddingLeft: '10px', paddingRight: '500px' }} > Email: {singleListing.email}</h13>

          <button class="btn btn-primary btn-sm" onClick={handleClick}>Contact Seller</button>
        </div>
      </div>
      <div id="showChat" style={{display: 'none'}}>{renderChat()}</div>
      {(currentUser.getUser().id === singleListing.userId) ? (renderAdmin()) : (renderUser())}
    </div>
  );
};

export default ProductPost;