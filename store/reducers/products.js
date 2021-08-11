import { DELETE_PRODUCT } from '../actions/products';
import PRODUCTS from '../../data/dummy-data';

const initalState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initalState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT :
           return {
               ...state,
               userProducts: state.userProducts.filter(product => product.id !== action.productId),
               availableProducts: state.availableProducts.filter(product => product.id !== action.productId)
           } 
    }

    return state;
}; 