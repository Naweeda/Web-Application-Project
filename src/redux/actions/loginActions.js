export const setEmail = email => ({
    type: 'UPDATE_EMAIL',
    email,
});

export const setPassword = password => ({
    type: 'UPDATE_PASSWORD',
    password,
});

export const setIsLoggedIn = isLoggedIn => ({
    type: 'USER_SET_IS_LOGGED_IN',
    isLoggedIn,
});