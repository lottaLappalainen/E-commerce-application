import {
    FETCH_ORDERS,
    ADD_ORDER,
    FETCH_ORDER
} from '../actions/orderActions';

const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_ORDERS}_SUCCESS`:
            return {
                ...state,
                loading: false,
                orders: action.payload
            };
        case `${FETCH_ORDER}_SUCCESS`:
            return {
                ...state,
                loading: false,
                order: action.payload
            };
        case `${ADD_ORDER}_SUCCESS`:
            return {
                ...state,
                loading: false,
                orders: [...state.orders, action.payload]
            };
        case `${FETCH_ORDERS}_FAILURE`:
        case `${FETCH_ORDER}_FAILURE`:
        case `${ADD_ORDER}_FAILURE`:
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
