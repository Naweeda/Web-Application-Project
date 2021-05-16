import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setDescription, setType, setPrice, setTitle, setListings } from '../redux/actions/listingActions';
import currentUser from './currentUser'; // gets current user
import './ListingCreationForm.css';

const ListingCreationForm = () => {
  const dispatch = useDispatch(); // alerts redux that an actions has changed
  // variables to hold reducer variables
  const description = useSelector(state => state.listingReducer.description);
  const type = useSelector(state => state.listingReducer.type);
  const price = useSelector(state => state.listingReducer.price);
  const title = useSelector(state => state.listingReducer.title);
  let history = useHistory();


  // runs when form is submitted
  const submit = () => {
    if(currentUser.getUser().isLoggedIn) {
      // form that holds listing information
      let productImage = document.getElementById("productImage");
      let formData = new FormData();
      formData.append("imageFile", productImage.files[0]);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("price", price);
      formData.append("title", title);
      formData.append("userId", currentUser.getUser().id);

      // sends the form listing to api
      axios.post('/api/createListing', formData, { headers: { 'content-type': "multipart/form-data" } })
        .then((response) => {
          console.log(response);
          const itemsArray = response.data;
          dispatch(setListings(itemsArray));
        })
        .catch((error) => {
          console.log(error);
        });

      // gets the listing from api
      axios.get('/api/viewListings')
        .then((response) => {
          console.log(response);
          const itemsArray = response.data;
          dispatch(setListings(itemsArray));
        })
        .catch((error) => {
          console.log(error);
        });
      document.getElementById('input-description').value = '';
      document.getElementById('input-type').value = '';
      document.getElementById('input-price').value = '';
      document.getElementById('input-title').value = '';
    } else {
        alert("You are not logged in.");
        history.push('/sign-in');
    }
  };

  return (
    <div>
      <h1>Create Listing</h1>
      <br></br>
      <div className="form-group">
        <label>Title:</label>
        <input
          id="input-title"
          type="text"
          onChange={e => dispatch(setTitle(e.target.value))}
          value={title} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          id="input-description"
          type="text"
          onChange={e => dispatch(setDescription(e.target.value))}
          value={description} />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <input
          id="input-type"
          type="text"
          onChange={e => dispatch(setType(e.target.value))}
          value={type} />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          id="input-price"
          type="number"
          onChange={e => dispatch(setPrice(e.target.value))}
          value={price} />
      </div>
      <div>
        <input type="file" id="productImage" accept="image/jpg,image/jpeg,image/png" />
      </div>
        <br></br>
      <div>
        <button id="submit" onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default ListingCreationForm;
