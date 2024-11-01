import axios from '../axiosConfig';
import { setNotification } from '../actions/notificationActions'; 

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

const createAsyncAction = (type, requestFunction) => async (dispatch, ...args) => {
    dispatch(setNotification({ message: `Processing ${type.toLowerCase()}...`, stateType: 'product', requestStatus: 'loading' }));
    try {
        const response = await requestFunction(...args);
        dispatch({ type: `${type}_SUCCESS`, payload: response.data });
        dispatch(setNotification({ message: `${type.toLowerCase()} processed successfully!`, stateType: 'product', requestStatus: 'success' }));
    } catch (error) {
      console.log(error)
        dispatch({ type: `${type}_FAILURE`, payload: error.message });
        dispatch(setNotification({ message: `Failed to process ${type.toLowerCase()}`, stateType: 'product', requestStatus: 'error' }));
    }
};

export const fetchProducts = () => createAsyncAction(FETCH_PRODUCTS, () => axios.get('http://localhost:3001/api/products'));

export const fetchProduct = (productId) => createAsyncAction(FETCH_PRODUCT, () => axios.get(`http://localhost:3001/api/products/${productId}`));

export const addProduct = (productData) => createAsyncAction(ADD_PRODUCT, () => axios.post('http://localhost:3001/api/products', productData));

export const deleteProduct = (productId) => createAsyncAction(DELETE_PRODUCT, () => axios.delete(`http://localhost:3001/api/products/${productId}`));
