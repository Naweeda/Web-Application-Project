const INITIAL_STATE = {
    user: 'default',
    password: '',
    isLoggedIn: false,
    loadingState: 'init',
  };
  
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default userReducer;