import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import messageReducer from './redux/reducers/messageReducer';
import { insertMessage } from './redux/actions/messageActions';

// HW2
import listingReducer from './redux/reducers/listingReducer';
import inquiryReducer from './redux/reducers/inquiryReducer';
import registerReducer from './redux/reducers/registerReducer';

const rootReducer = combineReducers({
  messageReducer,
  listingReducer, // HW2
  inquiryReducer, // HW2
  registerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

let host = window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`);
console.log(host);
let webSocket;

if (host.includes('localhost')) {
  webSocket = new WebSocket('ws://localhost:4004');
} else {
  webSocket = new WebSocket('ws://' + host + '/websocket');
}

webSocket.onmessage = (message) => {
  console.log(message)
  store.dispatch(insertMessage(message.data));
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
