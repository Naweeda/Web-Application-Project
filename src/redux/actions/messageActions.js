import axios from 'axios';

export const updateMessages = messages => {
  return {
    type: 'UPDATE_MESSAGES',
    messages,
  };
};

export const insertMessage = message => {
  console.log('inserting message')
  return {
    type: 'INSERT_MESSAGE',
    message,
  };
};

export const handlTextChange = text => {
  return {
    type: 'UPDATE_TEXT',
    text,
  };
};

export const submitMessage = (id) => (dispatch, getState) => {
  console.log(id);
  axios.post('/messanger/postMessage', { message: getState().messageReducer.text, channelId: id })
    .then(() => { })
    .catch(e => console.log(e));
  dispatch(handlTextChange(''));
};