// productReducer.js
import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCT,
} from '../actions/productActions';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
      case `${FETCH_PRODUCTS}_SUCCESS`:
          return {
              ...state,
              loading: false,
              products: action.payload,
          };
      case `${FETCH_PRODUCT}_SUCCESS`:
          return {
              ...state,
              loading: false,
              product: action.payload,
          };
      case `${ADD_PRODUCT}_SUCCESS`:
          return {
              ...state,
              loading: false,
              products: [...state.products, action.payload],
          };
      case `${DELETE_PRODUCT}_SUCCESS`:
          return {
              ...state,
              loading: false,
              products: state.products.filter(product => product.id !== action.payload.id), 
          };
      case `${FETCH_PRODUCTS}_FAILURE`:
      case `${FETCH_PRODUCT}_FAILURE`:
      case `${ADD_PRODUCT}_FAILURE`:
      case `${DELETE_PRODUCT}_FAILURE`:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export default productReducer;
