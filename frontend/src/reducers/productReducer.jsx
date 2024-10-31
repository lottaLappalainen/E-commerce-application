import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE
} from '../actions/productActions'; 

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null
      };
    case FETCH_PRODUCT_REQUEST: 
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PRODUCTS_FAILURE:
    case DELETE_PRODUCT_FAILURE:
    case FETCH_PRODUCT_SUCCESS: 
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null
      };
    case FETCH_PRODUCT_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_PRODUCT_SUCCESS:
      const updatedProducts = state.products.filter(product => product.id !== action.productId);
      return {
        ...state,
        loading: false,
        products: updatedProducts,
        error: null
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
        error: null
      };
    default:
      return state;
  }
};

export default productReducer;
