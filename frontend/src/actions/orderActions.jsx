import axios from '../axiosConfig';
import { setNotification } from '../actions/notificationActions';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDER = 'FETCH_ORDER';

const createAsyncAction = (type, requestFunction) => async (dispatch, ...args) => {
    dispatch(setNotification({ message: `${type.toLowerCase()}...`, stateType: 'order', requestStatus: 'loading' }));
    try {
        const response = await requestFunction(...args);
        dispatch({ type: `${type}_SUCCESS`, payload: response.data });
        dispatch(setNotification({ message: `${type.toLowerCase()} successfully!`, stateType: 'order', requestStatus: 'success' }));
    } catch (error) {
        dispatch({ type: `${type}_FAILURE`, payload: error.message });
        dispatch(setNotification({ message: `Failed to ${type.toLowerCase()}. Please try again later.`, stateType: 'order', requestStatus: 'error' }));
    }
};

export const fetchOrders = () => createAsyncAction(FETCH_ORDERS, () => axios.get('http://localhost:3001/api/orders'));

export const fetchOrder = (orderId) => createAsyncAction(FETCH_ORDER, () => axios.get(`http://localhost:3001/api/orders/${orderId}`));

export const addOrder = (orderData) => createAsyncAction(ADD_ORDER, () => axios.post('http://localhost:3001/api/orders', orderData));
