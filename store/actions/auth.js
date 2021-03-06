export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {

    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDw949wJdG2vPpdeA4lK_L6GJPIhcPBzbs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email already exists!'
            }

            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw949wJdG2vPpdeA4lK_L6GJPIhcPBzbs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Invalid password!'
            }

            throw new Error(message);
        }

        const responseData = await response.json();

        dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId });
    };
};