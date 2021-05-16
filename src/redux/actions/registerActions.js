export const setName = name => ({
    type: 'UPDATE_NAME',
    name,
});

export const setEmail = email => ({
    type: 'UPDATE_EMAIL',
    email,
});

export const setPassword = password => ({
    type: 'UPDATE_PASSWORD',
    password,
});

export const setConfirmPassword = confirmPassword => ({
    type: 'UPDATE_CONFIRM_PASSWORD',
    confirmPassword,
});
