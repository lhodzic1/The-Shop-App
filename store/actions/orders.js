export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {

        const date = new Date();

        const response = await fetch('https://rn-complete-guide-8af80-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        };

        const responseData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: responseData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    };

};