const INITIAL_STATE = {
    email: '',
    password: '',
    isLoggedIn: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'UPDATE_EMAIL':
            return {
                ...state,
                email: action.email,
            };
        case 'UPDATE_PASSWORD':
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

export default loginReducer;