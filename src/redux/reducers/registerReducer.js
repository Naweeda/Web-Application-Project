const REGISTER_STATE = {
    name: '',
    email: '',
    password: '',
    confirmPassword:'',
};

const registerReducer = (state = REGISTER_STATE, action) => {
    switch(action.type) {
        case 'UPDATE_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'UPDATE_EMAIL':
        return {
            ...state,
            email: action.email
        };
        case 'UPDATE_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        case 'UPDATE_CONFIRM_PASSWORD':
        return {
            ...state,
            confirmPassword: action.confirmPassword
        };
        default:
            return {...state};
    }
};

export default registerReducer;