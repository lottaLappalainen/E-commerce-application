import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE
} from '../actions/orderActions';

const initialState = {
    orders: [],       
    order: null,     
    loading: false,   
    error: null       
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            };
        case FETCH_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [...state.orders, action.payload]
            };
        case ADD_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                order: null,
                error: null
            };
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            };
        case FETCH_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;
