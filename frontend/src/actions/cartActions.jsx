export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

import axios from '../axiosConfig';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: { ...product, quantity: 1 },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const fetchProducts = () => async dispatch => {
  dispatch(setNotification({ message: 'Fetching products...', stateType: 'user', requestStatus: 'loading' })); 
  try {
    const response = await axios.get('http://localhost:3001/api/products');
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: response.data.products
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message
    });
  }
};
