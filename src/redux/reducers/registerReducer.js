const INITIAL_STATE = {
    name: 'default',
    email: '',
    password: '',
    isLoggedIn: false,
    loadingState: 'init',
  };
  
  const registerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NAME_SET_NAME':
            return {
                ...state,
                name:action.name,
            };
        case 'EMAIL_SET_EMAIL':
            return {
                ...state,
                email:action.email,
            };
        case 'USER_SET_PASSWORD':
            return {
            ...state,
            password: action.password,
            };
        case 'USER_SET_IS_LOGGED_IN':
            return {
            ...state,
            isLoggedIn: action.isLoggedIn,
            };
      default:
        return state;
    }
  };
  
  export default registerReducer;