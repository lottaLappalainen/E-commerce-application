import axios from '../axiosConfig';
import { setNotification } from '../actions/notificationActions'; 

export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';

export const FETCH_ORDER_REQUEST = 'FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';

export const fetchOrderRequest = () => ({
    type: FETCH_ORDER_REQUEST,
});

export const fetchOrderSuccess = (order) => ({
    type: FETCH_ORDER_SUCCESS,
    payload: order,
});

export const fetchOrderFailure = (error) => ({
    type: FETCH_ORDER_FAILURE,
    payload: error,
});

export const fetchOrder = (orderId) => async (dispatch) => {
    dispatch(fetchOrderRequest());
    dispatch(setNotification({ message: 'Fetching order...', stateType: 'order', requestStatus: 'loading' })); 
    try {
        const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`);
        dispatch(fetchOrderSuccess(response.data));
        dispatch(setNotification({ message: 'Order fetched successfully!', stateType: 'order', requestStatus: 'success' })); 
    } catch (error) {
        dispatch(fetchOrderFailure(error.message));
        dispatch(setNotification({ message: 'Failed to fetch order. Please try again later.', stateType: 'order', requestStatus: 'error' })); 
    }
};

// Action creator to fetch orders
export const fetchOrders = () => async (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    dispatch(setNotification({ message: 'Fetching orders...', stateType: 'order', requestStatus: 'loading' })); 
    try {
        const response = await axios.get('http://localhost:3001/api/orders');
        dispatch({
            type: FETCH_ORDERS_SUCCESS,
            payload: response.data
        });
        dispatch(setNotification({ message: 'Orders fetched successfully!', stateType: 'order', requestStatus: 'success' })); 
    } catch (error) {
        dispatch(setNotification({ message: 'Failed to fetch orders. Please try again later.', stateType: 'order', requestStatus: 'error' })); 
        dispatch({
            type: FETCH_ORDERS_FAILURE,
            payload: error.message
        });
    }
};

// Action creator to add an order
export const addOrderRequest = () => ({
    type: ADD_ORDER_REQUEST,
});

export const addOrderSuccess = (order) => ({
    type: ADD_ORDER_SUCCESS,
    payload: order,
});

export const addOrderFailure = (error) => ({
    type: ADD_ORDER_FAILURE,
    payload: error,
});

export const addOrder = (orderData) => async (dispatch) => {
    dispatch(addOrderRequest());
    dispatch(setNotification({ message: 'Adding order...', stateType: 'order', requestStatus: 'loading' })); 
    try {
        const response = await axios.post('http://localhost:3001/api/orders', orderData);
        const newOrder = response.data;

        dispatch(addOrderSuccess(newOrder));
        dispatch(setNotification({ message: 'Order added successfully!', stateType: 'order', requestStatus: 'success' })); 
        return newOrder; // Return the newly created order
    } catch (error) {
        dispatch(addOrderFailure(error.message));
        dispatch(setNotification({ message: 'Failed to add order. Please try again later.', stateType: 'order', requestStatus: 'error' })); 
        throw error; // Re-throw the error to be caught by the calling component
    }
};