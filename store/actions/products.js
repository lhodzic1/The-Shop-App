export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, productId: productId }
};

export const createProduct = (title, imageUrl, price, description) => {
    return async dispatch => {
        //any async code can be executed here
        const response = await fetch('https://rn-complete-guide-8af80-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const responseData = await response.json();

        console.log(responseData);

        dispatch({
            type: CREATE_PRODUCT, productData: {
                id: responseData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            }
        });
    }

};

export const updateProduct = (id, title, imageUrl, price, description) => {
    return {
        type: UPDATE_PRODUCT,
        productId: id,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price
        }
    }
};